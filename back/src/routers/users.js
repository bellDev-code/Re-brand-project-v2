const router = require("express").Router();
const db = require("../db");
const dayjs = require("dayjs");
const { emailRegex } = require("../utils/regex.js");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { IsLoggedIn } = require("../middlewares/auth");

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
        INSERT INTO public.User (username, password, name, email, createdAt)
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
        SELECT id, name, email, createdAt FROM public.User WHERE id = $1
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
        SELECT id, email, name, createdAt FROM public.user WHERE id = $1 
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

    // req.session.userId = user.id;
    // req.session.save(() => {
    //   return res.json({
    //     success: true,
    //     error: null,
    //     data: null,
    //   });
    // });

    // return res.json({
    //   success: true,
    //   error: null,
    //   data: null,
    // });
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
  console.log(req.body);
  console.log(req.query);

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

router.post("/find", async (req, res, next) => {
  try {
    const client = await db.connect();

    const result = await client.query(
      `
        SELECT * FROM public.User WHERE email = $1
      `,
      [req.body.email]
    );

    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
