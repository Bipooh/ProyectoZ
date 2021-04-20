const fs = require("fs");
const { validationResult } = require("express-validator");

const userController = {
    login: function(req,res) {
        res.render("login");
    },
    register: function(req,res) {
        res.render("register");
    },
    logining: function(req,res) {
        let errores = validationResult(req);
        if(errores.isEmpty()){

        } else {
            return res.render("login", {
                errores: errores.mapped(),
                old: req.body
            })
        }
        
        res.redirect("/");
    },
    create: function(req,res) {
        let errores = validationResult(req);
        if(errores.isEmpty()){
            let usuario = {
                        nombre: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        category: req.body.category,
                        image: req.body.img
                    }

                    let archivoUsuario = fs.readFileSync("users.json", "utf-8");
                    let usuarios;
                    if (archivoUsuario == "") {
                        usuarios = [];
                    }
                    else {
                        usuarios = JSON.parse(archivoUsuario);
                    }
                    usuarios.push(usuario);

                    let usuariosJSON = JSON.stringify(usuarios);
                    fs.writeFileSync("users.json", usuariosJSON);        

                    res.redirect("/user/register");
        } else {
            res.render("register", {
                errores: errores.mapped(),
                old: req.body
            });
        }
        
    }
}

module.exports = userController;