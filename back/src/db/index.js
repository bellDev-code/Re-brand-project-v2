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
  await client.query(
    `
      CREATE TABLE IF NOT EXISTS public.User(
        id    SERIAL     PRIMARY KEY,
        username    TEXT    NOT NULL    UNIQUE,
        password    TEXT    NOT NULL,
        name        TEXT    NOT NULL,
        createdAt    TIMESTAMP   NOT NULL,
        email       TEXT    NOT NULL    UNIQUE
      )
    `
  );
  await client.release();
};

initialize();

module.exports = pool;
