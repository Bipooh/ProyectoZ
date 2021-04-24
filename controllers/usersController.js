const fs = require("fs");
const { validationResult } = require("express-validator");
const path = require("path");
const bcrypt = require("bcryptjs");

const usersDataBase = path.join(__dirname, "../dataBase/users.json");

const User = require("../models/users");

const userController = {
    login: function(req,res) {
        res.render("login");
    },
    register: function(req,res) {
        res.render("register");
    },
    loginProcess: function(req,res) {
        let errores = validationResult(req);
        if(errores.isEmpty()){
            let userToLogin = User.findByField("username", req.body.username);
            if(userToLogin) {
                let okPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                if(okPassword){
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;

                    if (req.body.recordar) {
                        res.cookie("rememberUser", req.body.username, { maxAge: 60000 })
                    }
                    
                    return res.redirect("/user/profile");
                }
                return res.render("login",{
                    errores: {
                        username: {
                            msg: "Credenciales inválidas!",
                        }
                    },
                    old: req.body
                })
            }

            return res.render("login",{
                errores: {
                    username: {
                        msg: "Este username no está en uso",
                    }
                },
                old: req.body
            });
        }
        else {
            return res.render("login", {
                errores: errores.mapped(),
                old: req.body
            })
        }
    },
    create: function(req,res) {
        let errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.render("register", {
                errores: errores.mapped(),
                old: req.body
            });
        }

        let userOnDB = User.findByField("email", req.body.email);
        if(userOnDB) {
            return res.render("register", {
                errores: {
                    email: {
                        msg: "Este email ya está en uso."
                    }
                },
                old: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
        }

        User.create(userToCreate);
        return res.redirect("/user/login");
    },
    profile: function(req,res) {
        console.log(req.cookies.rememberUser);
        return res.render("profile", {
            user: req.session.userLogged,
        });
    },
    logout: function(req,res) {
        res.clearCookie("rememberUser");
        req.session.destroy();
        return res.redirect("/");
    }
}

module.exports = userController;