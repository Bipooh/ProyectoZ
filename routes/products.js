var express = require("express");
var router = express.Router();

var productController = require("../controllers/productsController");

router.get("/detail", productController.detail);

router.get("/detail/edit", productController.edit);
router.put("/detail", productController.actualizar);

router.get("/create", productController.create);
router.post("/create", productController.store);

module.exports = router;