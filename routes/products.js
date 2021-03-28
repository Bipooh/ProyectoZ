var express = require("express");
var router = express.Router();

var productController = require("../controllers/productsController");

router.get("/detail", productController.detail);
router.get("/create", productController.create);

module.exports = router;