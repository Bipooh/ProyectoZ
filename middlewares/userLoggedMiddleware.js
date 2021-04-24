// No mostrará el boton para acceder o registrarse si está logeado
const { findByField } = require("../models/users");
const User = require("../models/users");

function userLoggedMiddleware(req,res,next){
    res.locals.isLogged = false;

    let userInCookie = req.cookies.rememberUser;
    let userFromCookie = User.findByField('username', userInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
        res.locals.isLogged = true;
    }

    

    next();
}

module.exports = userLoggedMiddleware;