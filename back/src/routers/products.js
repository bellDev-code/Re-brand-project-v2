const express = require("express");
const router = express.Router();
const db = require("../db");
const dayjs = require("dayjs");
const util = require("util");
const sql = require("../db/sql");
const { validInt } = require("../utils/parse");

const joinMapping = (row) => {
  let result = {};

  for (const [key, value] of Object.entries(row)) {
    const split = key.split("_");

    if (split.length > 1) {
      delete row[key];

      const referenceTableName = split[0];
      const referenceColumnName = split[1];

      // console.log(referenceTableName, referenceColumnName, value);

      result = {
        ...result,
        [referenceTableName]: {
          ...(result[referenceTableName] ?? {}),
          [referenceColumnName]: value,
        },
      };
    }
    // console.log(row);
  }

  for (const [key, value] of Object.entries(result)) {
    row[key] = value;
  }
  return row;
};

router.get("/", async (req, res, next) => {
  try {
    const query = req.query;

    const page = validInt(query.page);
    const perPage = validInt(query.perPage);

    const client = await db.connect();

    let { rows } = await client.query(
      sql.product.findDetail({
        paging: {
          limit: perPage,
          offset: page * perPage,
        },
      })
    );

    rows = rows.map((row) => joinMapping(row));

    const countResult = await client.query(`
        SELECT COUNT(*)
        FROM public."Product" p
      `);

    const totalCount = countResult.rows[0].count;

    client.release();

    return res.status(200).json({
      pageInfo: {
        totalCount: parseInt(totalCount) || 0,
      },
      list: rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      price,
      count,
      sale,
      categoryId,
      brandId,
      info: { color, offerGender, size, manufacturer, origin },
      detail: { material },
    } = req.body;

    const now = dayjs().format();

    const client = await db.connect();

    // Transaction sql 쿼리문들을 하나로 그룹화시킨다.
    // 하나의 명령이 잘못되면 전체 취소(rollBack)
    // 트랙잭션이 성공적으로 종료했을때 commit으로 모든 데이터를 저장한다.

    // Transaction 시작
    try {
      await client.query("BEGIN");

      const infoResult = await client.query(
        `
          INSERT INTO public."ProductInfo" (color, "offerGender", size, manufacturer, origin, "createdAt", "updatedAt") 
          VALUES ($1, $2, $3, $4, $5, $6, $6)
          RETURNING id
        `,
        [color, offerGender, size, manufacturer, origin, now]
      );

      const infoId = infoResult.rows[0].id;

      const detailResult = await client.query(
        `
        INSERT INTO public."ProductDetail" (material, "createdAt", "updatedAt") 
        VALUES ($1, $2, $2) 
        RETURNING id
      `,
        [material, now]
      );

      const detailId = detailResult.rows[0].id;

      await client.query(
        `
      INSERT INTO public."Product" (name, price, count, sale, "categoryId", "brandId", "infoId", "detailId", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9);
    `,
        [name, price, count, sale, categoryId, brandId, infoId, detailId, now]
      );

      // const youngdoError = new Error("영도");
      // youngdoError.name = "영도에러";
      // throw youngdoError;

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    // OneToOne 관계 키를 가지고 있는 테이블 늦게 만들고,
    // 키를 안가진 테이블부터 만들어서 id 얻고 Relation 연결하기

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
