var express = require("express");
var router = express.Router();
var path = require("path");
var multer = require("multer");

var validarCreateForm = require("../middlewares/validarCreateForm");
var validarLoginForm = require("../middlewares/validarLoginForm");
var userController = require("../controllers/usersController");
var guestMiddleware = require("../middlewares/guestMiddleware");
var authMiddleware = require("../middlewares/authMiddleware");

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        let folder = path.join(__dirname, "../public/images/users");
        cb(null,folder);
    },
    filename: function(req,file,cb){
        let name = Date.now() + path.extname(file.originalname);
        cb(null,name);
    }
});

var uploadFile = multer({storage: storage});

router.get("/login",guestMiddleware, userController.login);
router.post("/login",validarLoginForm, userController.loginProcess);

router.get("/register",guestMiddleware, userController.register);
router.post("/register", validarCreateForm, uploadFile.single("image") ,userController.create);

router.get("/profile",authMiddleware, userController.profile);
router.get("/logout", userController.logout);

module.exports = router;