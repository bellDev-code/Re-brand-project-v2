// router 생성 방법
const express = require("express");
const router = express.Router();

// express 선언하고 바로 router 만드는 방법
// const express = require("express").Router();

// 두 번 나눈것
router.get("/", (req, res, next) => {
  res.send("ok");
});

router.get("/seller", (req, res, next) => {
  res.send("ok");
});

// exports = router;
// 예제 : const { router } = require("express")

// default
module.exports = router;
