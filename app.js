let express = require("express");
let app = express();
let path = require("path");

const publicFolderPath = path.resolve(__dirname, "./public");
app.use(express.static(publicFolderPath));

app.listen (2020, () => console.log("Puerto abierto: 2020"));

app.get("/", function(req,res) {
    let htmlPath = path.resolve(__dirname, "./views/index.html");
    res.sendFile(htmlPath);
});
app.get("/login", function(req,res) {
    let htmlPath = path.resolve(__dirname, "./views/login.html");
    res.sendFile(htmlPath);
});
app.get("/register", function(req,res) {
    let htmlPath = path.resolve(__dirname, "./views/register.html");
    res.sendFile(htmlPath);
});
app.get("/product", function(req,res) {
    let htmlPath = path.resolve(__dirname, "./views/product.html");
    res.sendFile(htmlPath);
});
app.get("/create", function(req,res) {
    let htmlPath = path.resolve(__dirname, "./views/create-form.html");
    res.sendFile(htmlPath);
});