const express = require("express");
const router = express.Router();
const db = require("../db");
const dayjs = require("dayjs");
const util = require("util");

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      price,
      count,
      sale,
      categoryId,
      color,
      offerGender,
      size,
      manufacturer,
      origin,
    } = req.body;

    const now = dayjs().format();

    const client = await db.connect();

    await client.query(
      `
        INSERT INTO public."ProductInfo" (color, "offerGender", size, manufacturer, origin, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $6) 
      `,
      [color, offerGender, size, manufacturer, origin, now]
    );

    await client.query(
      `
      INSERT INTO public."Product" (name, price, count, sale, "categoryId", "infoId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $7);
    `,
      [name, price, count, sale, categoryId, now]
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

router.post("/info", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
