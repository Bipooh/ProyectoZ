var express = require("express");
var router = express.Router();

var userController = require("../controllers/usersController");

router.get("/login", userController.login);
router.get("/register", userController.register);

module.exports = router;