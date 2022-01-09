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

// get product list (pagination)
router.get("/", async (req, res, next) => {
  try {
    const query = req.query;

    const page = validInt(query.page);
    const perPage = validInt(query.perPage);

    const client = await db.connect();

    // const { rows: testRows } = await client.query(
    //   sql.product.find({ id: [28, 29, 30, 31] })
    // );

    // console.log("testRows", testRows);

    let { rows } = await client.query(
      sql.product.find({
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

// Create Product
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
      thumbnail,
      images,
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

      let thumbId;

      if (thumbnail) {
        if (!thumbnail.url || !thumbnail.key) {
          throw new Error();
        }

        const {
          rows: [thumb],
        } = await client.query(
          `
        INSERT INTO public."File" (url, key, "createdAt", "updatedAt") VALUES ($1, $2, $3, $3)
        RETURNING id
        `,
          [thumbnail.url, thumbnail.key, now]
        );

        thumbId = thumb.id;
      }

      console.log("check");
      const {
        rows: [product],
      } = await client.query(
        `
      INSERT INTO public."Product" (name, price, count, sale, "categoryId", "brandId", "infoId", "detailId", "thumbnailId", "createdAt", "updatedAt") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $10)
      RETURNING id
    `,
        [name, price, count, sale, categoryId, brandId, infoId, detailId, thumbId, now]
      );

      if (images && images.length > 0) {
        console.log(product.id);
        const promises = images
          .filter((image) => {
            if (!image.url || !image.key) {
              return false;
            }
            return true;
          })
          .map(async (image) => {
            console.log(image);
            return client.query(
              `
            INSERT INTO public."File" (url, key, "productImageId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $4)
            `,
              [image.url, image.key, product.id, now]
            );
          });

        await Promise.all(promises);
      }

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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const client = await db.connect();

    let { rows } = await client.query(sql.product.findDetail({ id: id }));

    const [product] = rows.map((row) => joinMapping(row));

    const { rows: images } = await client.query(sql.file.find("productImageId", product.id));

    product.images = images;

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      error: error.message,
    });
  }
});

// rebrand.com/product/3

module.exports = router;
