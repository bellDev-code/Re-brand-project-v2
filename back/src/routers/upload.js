const express = require("express");
const router = express.Router();

const multer = require("multer");

const upload = multer({
  dest: "./assets",
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const makeUploadResponse = (file) => {
  return {
    url: process.env.HOST + "/" + file.path,
    key: file.filename,
  };
};

router.post("/product/thumbnail", upload.single("product"), (req, res, next) => {
  const result = makeUploadResponse(req.file);

  return res.json([result]);
});

router.post("/product/detail", upload.array("product", 5), (req, res, next) => {
  const result = req.files.map(makeUploadResponse);

  return res.json(result);
});

module.exports = router;
