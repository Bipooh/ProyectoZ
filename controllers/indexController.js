const fs = require("fs");
const path = require("path");
const productsDataBase = path.join(__dirname, "../dataBase/products.json");

let archivoProducto = JSON.parse(fs.readFileSync(productsDataBase, "utf-8"));

const indexController = {
    index: function(req,res) {
        console.log("Estas en profile");
        console.log(req.session);
        return res.render("index", {products: archivoProducto});
    }
}

module.exports = indexController;