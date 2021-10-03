// pg client 생성
require("dotenv").config();
const { Pool } = require("pg");
const {
  createTable,
  addColumns,
  setRelation,
  setRelations,
} = require("./scripts");
const coreColumns = require("./sql");

// client에 빌려주는 역할
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

// DB 초기화
// 빌릴 때는 pool.connect() 다 끝난 후에, client.release();
const initialize = async () => {
  const client = await pool.connect();

  // Create Custom Types
  // type 만들시 IF문 만들고 타입을 만들면 된다.
  await client.query(
    `
    DO $$ 
      BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='gender') THEN
      CREATE TYPE gender AS ENUM('MALE', 'FEMALE', 'INTERSEX');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='verifytype') THEN
      CREATE TYPE verifytype AS ENUM('PHONE', 'EMAIL');
      END IF;
      END 
      $$
      
    `
  );

  // Create user table
  await createTable(client, "User");
  await addColumns(client, "User", [
    {
      name: "username",
      type: "TEXT",
      unique: true,
    },
    {
      name: "password",
      type: "TEXT",
    },
    {
      name: "name",
      type: "TEXT",
    },
    {
      name: "email",
      type: "TEXT",
      unique: true,
    },
    {
      name: "phoneNumber",
      type: "TEXT",
      nullable: true,
    },
  ]);

  // Create verification table

  await createTable(client, "Verification");
  await addColumns(client, "Verification", [
    {
      name: "payload",
      type: "TEXT",
    },
    {
      name: "verifyType",
      type: "verifytype",
    },
    {
      name: "isVerified",
      type: "BOOLEAN",
    },
    {
      name: "expiredAt",
      type: "TIMESTAMP",
    },
  ]);

  // Create Category table
  await createTable(client, "Category", true);

  await addColumns(client, "Category", {
    name: "name",
    type: "TEXT",
  });

  // Create Brand table
  await createTable(client, "Brand");

  await addColumns(client, "Brand", {
    name: "name",
    type: "TEXT",
  });

  // Create Product Info
  await createTable(client, "ProductInfo");
  await addColumns(client, "ProductInfo", [
    { name: "color", type: "TEXT" },
    {
      name: "offerGender",
      type: "gender",
    },
  ]);

  // Create Product Detail
  await createTable(client, "ProductDetail");

  // Create Product table
  // await client.query(
  //   `
  //   CREATE TABLE IF NOT EXISTS public."Product"(
  //     id            SERIAL         PRIMARY KEY,
  //     name          TEXT           NOT NULL,
  //     price         INTEGER        NOT NULL,
  //     count         INTEGER        NOT NULL,
  //     sale          FLOAT,
  //     "categoryId"  SERIAL,
  //     "infoId"      SERIAL         NOT NULL,
  //     "detailId"    SERIAL,
  //     "createdAt"   TIMESTAMP      NOT NULL,
  //     "updatedAt"   TIMESTAMP      NOT NULL,
  //     CONSTRAINT fk_category
  //       FOREIGN KEY("categoryId")
  //         REFERENCES public."Category"(id),
  //     CONSTRAINT fk_info
  //       FOREIGN KEY("infoId")
  //         REFERENCES public."ProductInfo"(id),
  //     CONSTRAINT fk_detail
  //       FOREIGN KEY("detailId")
  //         REFERENCES public."ProductDetail"(id)
  //   )
  //   `
  // );

  await createTable(client, "Product");
  await addColumns(client, "Product", [
    {
      name: "name",
      type: "TEXT",
    },
    {
      name: "price",
      type: "INTEGER",
    },
    {
      name: "count",
      type: "INTEGER",
    },
    {
      name: "sale",
      type: "FLOAT",
    },
  ]);
  await setRelations(client, "Product", [
    {
      referenceTableName: "Category",
      name: "categoryId",
    },
    {
      referenceTableName: "ProductInfo",
      name: "InfoId",
    },
    {
      referenceTableName: "ProductDetail",
      name: "detailId",
    },
  ]);

  await client.release();
};

initialize();

module.exports = pool;
