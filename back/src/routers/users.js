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

const { bcryptHashedJoin, changeHashed } = require("../hashed/bcryptHashed");
const { query } = require("../common/query");
const sql = require("../db/sql");

// JOIN USER
router.post("/", async (req, res, next) => {
  try {
    // email check
    if (!emailRegex.test(req.body.email)) {
      throw new Error("email 형식이 올바르지 않습니다. 확인해주세요.");
    }

    const client = await db.connect();

    const isExist = await query(
      client,
      sql.user.isExists,
      [req.body.username, req.body.email],
      (rows) => {
        return rows.length === 1;
      }
    );

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

    // const [user] = await query(
    //   client,
    //   sql.user.getUser,
    //   [parseInt(id)],
    //   (rows) => {
    //     return rows.length < 1;
    //   }
    // );
    const result = await query(
      client,
      sql.user.getUser,
      [parseInt(id)],
      (rows) => {
        return rows.length < 1;
      }
    );

    console.log(result);

    client.release();

    return res.json(result[0]);
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

        try {
          const rows = await query(
            client,
            sql.user.loginUser,
            [user.id],
            (rows) => !rows.length
          );

          console.log(rows);

          client.release();

          return res.status(200).json({
            success: true,
            error: null,
            data: rows[0],
          });
        } catch (error) {
          return next(error);
        }
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
    const result = req.query;

    const type = result.type;

    if (type !== "username" && type !== "email") {
      throw new Error(`${type} is not check type`);
    }

    const client = await db.connect();

    if (type === "username") {
      await query(
        client,
        sql.user.checkByUsername,
        [req.body.payload],
        (rows) => !rows
      );
    } else if (type === "email") {
      await query(
        client,
        sql.user.checkByEmail,
        [req.body.payload],
        (rows) => !rows
      );
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

    const rows = await query(
      client,
      sql.verify.find,
      [payload, code],
      (rows) => !rows
    );

    const verification = rows[0];

    validVerification(verification);

    const userQuery = await query(
      client,
      sql.user.findByEmail(["username", "email", "password"]),
      [verification.payload],
      (rows) => !rows
    );

    return res.json({
      success: true,
      username: userQuery[0].username,
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
