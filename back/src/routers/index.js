const router = require("express").Router();
const products = require("./products");
const users = require("./users");
const categories = require("./category");

router.use("/products", products);
router.use("/users", users);
router.use("/categories", categories);

module.exports = router;
