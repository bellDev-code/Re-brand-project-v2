const router = require("express").Router();
const db = require("../db");
const dayjs = require("dayjs");
const { emailRegex } = require("../utils/regex.js");
const bcrypt = require("bcrypt");

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

    await client.query(
      `
        INSERT INTO public.User (username, password, name, email, createdAt)
        VALUES ($1, $2, $3, $4, $5)
      `,
      [req.body.username, hashed, req.body.name, req.body.email, now]
    );
    client.release();

    return res.send("user join");
  } catch (error) {
    console.error(error);
    return res.status(403).send(error.message);
  }
});

// GET My Profile

router.get("/", async (req, res, next) => {
  try {
    console.log("my userId", req.session.userId);
    return res.send(req.session.userId);
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
    console.log(req.session);
    const { username, password } = req.body;
    console.log(req.body);

    const client = await db.connect();

    const result = await client.query(
      `
        SELECT id, username, password FROM public.User WHERE username = $1
      `,
      [username]
    );

    // rows 쿼리를 보낸 결과값 []
    console.log(result.rows);
    if (result.rows.length < 1) {
      throw Error("존재하지 않는 계정입니다.");
    }
    client.release();

    // username => unique
    const user = result.rows[0];

    const compared = await bcrypt.compare(password, user.password);
    // console.log(compared);

    if (!compared) {
      throw Error("존재하지 않는 계정입니다.");
    }

    req.session.userId = user.id;
    // req.session.save();

    return res.json({
      success: true,
      error: null,
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).send(error.message);
  }
});

// Delete USER
router.delete("/", async (req, res, next) => {
  res.send("Delete User");
});

module.exports = router;
