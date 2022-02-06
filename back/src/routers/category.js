const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (_, res, __) => {
  try {
    const client = await db.connect();

    const queryResult = await client.query(
      `
        SELECT * FROM public."Category"
      `
    );

    client.release();

    return res.status(200).json(queryResult.rows);
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: error.message,
    });
  }
});

// Create Category
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;

    const client = await db.connect();

    await client.query(
      `
        INSERT INTO public."Category" (name) VALUES ($1)
      `,
      [name]
    );

    client.release();

    return res.status(200).json({
      success: true,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
