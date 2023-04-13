
const Product_model = require('../models/product_model')

exports.get_home = async (req, res, next) => {
    try {
        const categories = await Product_model.get_uniqe_category();
        let category = req.query.category
        if (!category || category == "all") {
            const products = await Product_model.get_all_product();
            res.render('index', { products: products, categories: categories });
        }
        else {
            const filter_products = await Product_model.get_filtered_product(category);
            res.render('index', { products: filter_products, categories: categories });
        }

    } catch (err) {
        next(err);
    }

};
