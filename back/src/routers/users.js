const router = require("express").Router();
const db = require("../db");
const dayjs = require("dayjs");
const { emailRegex } = require("../utils/regex.js");
const bcrypt = require("bcrypt");

const passport = require("passport");
const { IsLoggedIn } = require("../middlewares/auth");
const { sendEmail } = require("../utils/email");

// JOIN USER
router.post("/", async (req, res, next) => {
  const now = dayjs().format();

  try {
    // email check
    if (!emailRegex.test(req.body.email)) {
      throw new Error("email 형식이 올바르지 않습니다. 확인해주세요.");
    }

    // use bcrypt
    const salt = await bcrypt.genSalt(+process.env.PASSWORD_ROUND_LENGTH);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const client = await db.connect();

    const isExist = await client.query(
      `
        SELECT * FROM public.User WHERE username = $1 OR email = $2
      `,
      [req.body.username, req.body.email]
    );

    if (isExist.rows.length) {
      throw new Error("이미 사용하고 있는 아이디 또는 이메일입니다.");
    }

    await client.query(
      `
        INSERT INTO public.User (username, password, name, email, "createdAt")
        VALUES ($1, $2, $3, $4, $5)
      `,
      [req.body.username, hashed, req.body.name, req.body.email, now]
    );
    client.release();

    return res.json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      success: false,
      error: error.message,
    });
  }
});

// GET My Profile
// IsLoggedIn 미들웨어 역할을 한다.
router.get("/", IsLoggedIn, async (req, res, next) => {
  try {
    return res.json({
      success: true,
      error: null,
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).send(error.message);
  }
});

// GET USER
router.get("/:id", async (req, res, next) => {
  try {
    const client = await db.connect();
    console.log(req.params);

    const { id } = req.params;

    const result = await client.query(
      `
        SELECT id, name, email, "createdAt" FROM public.User WHERE id = $1
      `,
      [parseInt(id)]
    );

    client.release();

    if (result.rows.length < 1) {
      return res.status(404).send("존재하지 않는 유저입니다.");
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(403).send(error.message);
  }
});

// LOGIN USER
router.post("/login", async (req, res, next) => {
  try {
    passport.authenticate("local", {}, (error, user, info) => {
      console.log("authenticate");
      if (error) {
        console.error(error);
        return next(error);
      }
      if (info) {
        return res.status(401).send(info.message);
      }
      req.login(user, async (loginErr) => {
        if (loginErr) {
          console.log(loginErr);
          return next();
        }

        const client = await db.connect();
        const { rows } = await client.query(
          `
        SELECT id, email, name, "createdAt" FROM public.user WHERE id = $1 
      `,
          [user.id]
        );

        client.release();

        return res.status(200).json({
          success: true,
          error: null,
          data: rows[0],
        });
      });
    })(req, res, next);
  } catch (error) {
    console.error(error);
    return res.status(403).send(error.message);
  }
});

// Delete USER
router.delete("/", async (req, res, next) => {
  res.send("Delete User");
});

// Check Register Data
router.post("/check", async (req, res, next) => {
  try {
    const query = req.query;

    const type = query.type;

    if (type !== "username" && type !== "email") {
      throw new Error(`${type} is not check type`);
    }

    const client = await db.connect();

    if (type === "username") {
      const { rows } = await client.query(
        `
          SELECT * FROM public.User WHERE username = $1
        `,
        [req.body.payload]
      );

      if (rows[0]) {
        throw new Error("이미 사용하고 있는 아이디입니다.");
      }
    } else if (type === "email") {
      const { rows } = await client.query(
        `
          SELECT * FROM public.User WHERE email = $1
        `,
        [req.body.payload]
      );

      if (rows[0]) {
        throw new Error("이미 사용하고 있는 이메일입니다.");
      }
    }

    client.release();

    return res.status(200).json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ success: false, error: error.message });
  }
});

// Find Username
router.post("/find", async (req, res, next) => {
  console.log(req.body);
  try {
    const client = await db.connect();

    const { rows } = await client.query(
      `
        SELECT username, email FROM public.User WHERE email = $1
      `,
      [req.body.email]
    );

    if (!rows.length) {
      throw new Error("해당 이메일을 가진 유저가 없습니다.");
    }

    await client.query(
      `
        DELETE FROM public.verification WHERE payload = $1
      `,
      [rows[0].email]
    );

    const expireAt = dayjs().minute(dayjs().minute() + 5);
    const code = (Math.random() * 1000000).toFixed(0);

    client.query(
      `
        INSERT INTO public.verification (type, payload, code, "isVerified", "expiredAt") VALUES($1, $2, $3, $4, $5)
      `,
      ["EMAIL", rows[0].email, code, false, expireAt.format()]
    );

    client.release();

    await sendEmail({
      to: rows[0].email,
      subject: "Re-brand 아이디 찾기 메일입니다.",
      text: `인증 코드는 ${code}입니다.`,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).send({ success: false, error: error.message });
  }
});

// Verify Code
router.post("/find/verify", async (req, res, next) => {
  try {
    const { payload, code } = req.body;

    const client = await db.connect();

    const { rows } = await client.query(
      `
        SELECT * FROM public.verification WHERE payload = $1 AND code = $2
      `,
      [payload, code]
    );

    if (!rows.length) {
      throw new Error("인증코드가 일치하지 않습니다.");
    }

    const verification = rows[0];

    // isVerified가 client에서는 기본값이 false이기 때문에
    if (verification.isVerified) {
      throw new Error("인증 오류");
    }

    if (dayjs(verification.expiredAt).format() < dayjs().format()) {
      throw new Error("인증 유효시간이 지났습니다.");
    }

    const userQuery = await client.query(
      ` 
        SELECT username, email FROM public.User WHERE email = $1
      `,
      [verification.payload]
    );

    if (!userQuery.rows.length) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    return res.json({
      success: true,
      username: userQuery.rows[0].username,
    });
  } catch (error) {
    return res.status(400).send({ success: false, error: error.message });
  }
});

router.post("/password", async (req, res, next) => {
  try {
    const client = await db.connect();

    const { rows } = await client.query(
      `
        SELECT password FROM public.User WHERE username = $1
      `,
      [req.body.username]
    );

    client.release();

    if (!rows.length) {
      throw new Error("해당 username을 가진 데이터가 없습니다.");
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(403).send(error.message);
  }
});

// Change Password
router.post("/change", async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(+process.env.PASSWORD_ROUND_LENGTH);
    const hashed = await bcrypt.hash(req.body.password, salt);

    const client = await db.connect();

    const { rows } = await client.query(
      `
        UPDATE public.User SET password=$1 WHERE username=$2
      `,
      [hashed, req.body.username]
    );

    client.release();

    return res.status(200).json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).send(error.message);
  }
});

module.exports = router;
