const fs = require("fs");
const path = require("path");

const productsDataBase = path.join(__dirname, "../dataBase/products.json");
let archivoProducto = fs.readFileSync(productsDataBase, "utf-8");

const productController = {
    detail: function(req,res) {
        res.render("product");
    },
    create: function(req,res) {
        res.render("create-form");
    },
    store: function(req,res) {
        let producto = {
            id: req.body.idproduct,
            nombre: req.body.nameproduct,
            marca: req.body.marcaproduct,
            image: req.body.imgproduct,
            price: req.body.priceproduct,
            category: req.body.categoryproduct,
            talla: req.body.tallaproduct,
            color: req.body.colorproduct,
            stock: req.body.stockproduct
        }
        
        let productos;
        if (archivoProducto == "") {
            productos = [];
        }
        else {
            productos = JSON.parse(archivoProducto);
        }
        productos.push(producto);

        let productosJSON = JSON.stringify(productos);
        fs.writeFileSync(productsDataBase, productosJSON);        

        res.redirect("/");
    },
    edit: function(req,res) {
        res.render("product-edit-form");
    },
    actualizar: function(req,res) {


        res.redirect("/");
    }
}

module.exports = productController;