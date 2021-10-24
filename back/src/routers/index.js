const router = require("express").Router();
const products = require("./products");
const users = require("./users");
const categories = require("./category");
const brands = require("./brand");

router.use("/products", products);
router.use("/users", users);
router.use("/categories", categories);
router.use("/brands", brands);

module.exports = router;
