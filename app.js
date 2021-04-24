var express = require("express");
var path = require("path");
var methodOverride = require("method-override");
var session = require("express-session");
var cookies = require("cookie-parser");
var userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var productRouter = require("./routes/products");

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "Hola",
    resave: false,
    saveUninitialized: false
}));
app.use(cookies());
app.use(userLoggedMiddleware);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen (2020, () => console.log("Puerto abierto: 2020"));

