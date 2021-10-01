const router = require("express").Router();
const db = require("../db");
const { emailRegex } = require("../utils/regex.js");
const passport = require("passport");
const { IsLoggedIn } = require("../middlewares/auth");

const {
  findUserByVerification,
  createVerification,
  sendVerification,
  findVerification,
  checkVerifyType,
  expireVerification,
  validVerification,
} = require("../verification/verification.js");

const { bcryptHashedJoin, changeHashed } = require("../useBcrypt/bcryptHashed");
const {
  isExistUser,
  getUser,
  LoginUser,
  checkUsername,
  checkUserEmail,
} = require("../user/user");

// JOIN USER
router.post("/", async (req, res, next) => {
  try {
    // email check
    if (!emailRegex.test(req.body.email)) {
      throw new Error("email 형식이 올바르지 않습니다. 확인해주세요.");
    }

    const client = await db.connect();

    const isExist = await isExistUser(client, req);

    if (isExist) {
      throw new Error("이미 사용하고 있는 아이디 또는 이메일입니다.");
    }

    await bcryptHashedJoin(client, req);

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

    const result = await getUser(client, id);

    console.log(result);

    client.release();

    if (!result) {
      return res.status(404).send("존재하지 않는 유저입니다.");
    }
    return res.json(result);
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

        const rows = LoginUser(client, user);

        client.release();

        return res.status(200).json({
          success: true,
          error: null,
          data: rows,
        });
      });
    })(req, res, next);
  } catch (error) {
    // console.error(error);
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
      const rows = checkUsername(client, req);

      if (rows) {
        throw new Error("이미 사용하고 있는 아이디입니다.");
      }
    } else if (type === "email") {
      const rows = checkUserEmail(client, req);

      if (rows) {
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
router.post("/find/send", async (req, res, next) => {
  try {
    const { type } = req.query;

    const payload = req.body.payload;

    checkVerifyType(type);

    const client = await db.connect();

    const user = await findUserByVerification(client, {
      type: type,
      payload: payload,
    });

    const verification = await createVerification(client, {
      type: type,
      payload: payload,
    });

    client.release();

    await sendVerification(type, user, verification.code);

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
        SELECT * FROM public."Verification" WHERE payload = $1 AND code = $2
      `,
      [payload, code]
    );

    if (!rows.length) {
      throw new Error("인증코드가 일치하지 않습니다.");
    }

    const verification = rows[0];

    validVerification(verification);

    const userQuery = await client.query(
      ` 
        SELECT username, email, password FROM public."User" WHERE email = $1
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

// Change Password
router.post("/find/change", async (req, res, next) => {
  try {
    const { type } = req.query;
    const { payload, verifyCode, changePassword } = req.body;

    checkVerifyType(type);

    const client = await db.connect();

    // no error 시 인증성공
    const verification = await findVerification(client, {
      type,
      payload,
      code: verifyCode,
    });

    validVerification(verification);

    await expireVerification(client, verification);

    await changeHashed(client, {
      type: type,
      payload: payload,
      changePassword: changePassword,
    });

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
