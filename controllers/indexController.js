const fs = require("fs");

let archivoProducto = JSON.parse(fs.readFileSync("products.json", "utf-8"));

const indexController = {
    index: function(req,res) {
        res.render("index", {products: archivoProducto});
    }
}

module.exports = indexController;