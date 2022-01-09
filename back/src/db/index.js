// pg client 생성
require("dotenv").config();
const { Pool } = require("pg");
const { createTable, addColumns, setRelations } = require("./scripts");

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
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname='size') THEN
      CREATE TYPE size AS ENUM('S', 'M', 'L', 'XL');
      END IF;
      END 
      $$
      
    `
  );

  // Create File Table

  await createTable(client, "File");
  await addColumns(client, "File", [
    {
      name: "url",
      type: "TEXT",
    },
    {
      name: "key",
      type: "TEXT",
    },
  ]);

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
      name: "code",
      type: "TEXT",
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
    {
      name: "size",
      type: "size",
    },
    {
      name: "manufacturer",
      type: "TEXT",
    },
    {
      name: "origin",
      type: "TEXT",
    },
  ]);

  // Create Product Detail
  await createTable(client, "ProductDetail");
  await addColumns(client, "ProductDetail", [
    {
      name: "material",
      type: "TEXT",
    },
  ]);

  // Create Product table
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
      name: "infoId",
    },
    {
      referenceTableName: "ProductDetail",
      name: "detailId",
    },
    {
      referenceTableName: "Brand",
      name: "brandId",
    },
    {
      referenceTableName: "File",
      name: "thumbnailId",
    },
  ]);

  await setRelations(client, "File", [
    {
      referenceTableName: "Product",
      name: "productImageId",
      nullable: true,
    },
  ]);

  await client.release();
};

initialize();

module.exports = pool;
