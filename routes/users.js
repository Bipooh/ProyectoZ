var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");

var { body } = require("express-validator");

var validarCreateForm = [
    body("name").notEmpty().withMessage("Debes completar este campo").bail()
    .isLength({min: 5}).withMessage("Debes completar un minimo de 5 caracteres"),
    body("email").notEmpty().withMessage("Debes completar este campo").bail()
    .isEmail().withMessage("Debes colocar un Email válido"),
    body("username").notEmpty().withMessage("Debes completar este campo").bail()
    .isLength({min: 5}).withMessage("Debes completar un minimo de 5 caracteres"),
    body("password").notEmpty().withMessage("Debes completar este campo").bail()
    .isLength({min: 5}).withMessage("Debes completar un minimo de 5 caracteres"),
];
var validarLoginForm = [
    body("username")
        .notEmpty().withMessage("Debes escribir tu nombre de usuario aqui").bail()
        .isLength({min:5}).withMessage("Debe contener un mínimo de 5 caracteres"),
    body("password")
        .notEmpty().withMessage("Debes escribir tu contraseña").bail()
        .isLength({min:5}).withMessage("Debe contener un mínimo de 5 caracteres"),
];

var userController = require("../controllers/usersController");

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

router.get("/login", userController.login);
router.post("/login",validarLoginForm, userController.logining);

router.get("/register", userController.register);
router.post("/register", validarCreateForm ,userController.create);


module.exports = router;