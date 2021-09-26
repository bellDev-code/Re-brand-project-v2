// pg client 생성
require("dotenv").config();
const { Pool } = require("pg");

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
      END 
      $$
      
    `
  );

  // Create user table
  await client.query(
    `
      CREATE TABLE IF NOT EXISTS public."User"(
        id            SERIAL     PRIMARY KEY,
        username      TEXT       NOT NULL    UNIQUE,
        password      TEXT       NOT NULL,
        name          TEXT       NOT NULL,
        "createdAt"   TIMESTAMP  NOT NULL,
        email         TEXT       NOT NULL    UNIQUE,
        "phoneNumber" TEXT       UNIQUE
      )
    `
  );

  // Create verification table
  await client.query(
    `
    CREATE TABLE IF NOT EXISTS public."Verification"(
      id            SERIAL      PRIMARY KEY,
      type          TEXT        NOT NULL,
      payload       TEXT        NOT NULL,
      code          TEXT        NOT NULL,
      "isVerified"  BOOLEAN     NOT NULL, 
      "expiredAt"   TIMESTAMP   NOT NULL
    )
    `
  );

  // Create Category table
  await client.query(
    `
    CREATE TABLE IF NOT EXISTS public."Category"(
      id            SERIAL         PRIMARY KEY,
      name          TEXT           NOT NULL
    )
    `
  );

  // Create Product Info
  await client.query(
    `
    CREATE TABLE IF NOT EXISTS public."ProductInfo"(
      id            SERIAL         PRIMARY KEY,
      color         TEXT           NOT NULL,
      "offerGender" gender         NOT NULL,
      "createdAt"   TIMESTAMP      NOT NULL,
      "updatedAt"   TIMESTAMP      NOT NULL
    )
    `
  );

  // Create Product Detail
  await client.query(
    `
    CREATE TABLE IF NOT EXISTS public."ProductDetail"(
      id            SERIAL         PRIMARY KEY,
      "createdAt"   TIMESTAMP      NOT NULL,
      "updatedAt"   TIMESTAMP      NOT NULL
    )
    `
  );

  // Create Product table
  await client.query(
    `
    CREATE TABLE IF NOT EXISTS public."Product"(
      id            SERIAL         PRIMARY KEY,
      name          TEXT           NOT NULL,
      price         INTEGER        NOT NULL,
      count         INTEGER        NOT NULL,
      sale          FLOAT,         
      "categoryId"  SERIAL,
      "infoId"      SERIAL         NOT NULL,
      "detailId"    SERIAL,
      "createdAt"   TIMESTAMP      NOT NULL,
      "updatedAt"   TIMESTAMP      NOT NULL,
      CONSTRAINT fk_category
        FOREIGN KEY("categoryId")
          REFERENCES public.Category(id),
      CONSTRAINT fk_info
        FOREIGN KEY("infoId")
          REFERENCES public."ProductInfo"(id),
      CONSTRAINT fk_detail
        FOREIGN KEY("detailId")
          REFERENCES public."ProductDetail"(id)
    )
    `
  );

  await client.release();
};

initialize();

module.exports = pool;
