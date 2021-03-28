const productController = {
    detail: function(req,res) {
        res.render("product");
    },
    create: function(req,res) {
        res.render("create-form");
    }
}

module.exports = productController;