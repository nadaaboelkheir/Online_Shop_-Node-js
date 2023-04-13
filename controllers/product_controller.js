const Product_model = require('../models/product_model')

exports.get_product_details = async (req, res, next) => {

    try {
        let id = req.params.id
        if (!id) {
            res.status(404).send("product not found")
        }
        const products = await Product_model.get_product_byID(id);
        res.render('product', { products: products });
    }
    catch (err) {
        next(err);
    }
}
