const mongoose = require('mongoose')
require ('dotenv').config()
const DB_URL = process.env.DB_URL
const Product_modelSchema = mongoose.Schema(
  {
    name: String
    , image: String
    , price: Number
    , description: String
    , category: String
  });

const Product_model = mongoose.model('product', Product_modelSchema);
exports.get_all_product = async () => {
  try {
    await mongoose.connect(DB_URL);
    const products = await Product_model.find({});
    // console.log(products)
    mongoose.disconnect();
    return products;
  } catch (error) {
    throw error;
  }
}
exports.get_filtered_product = async (category) => {
  try {
    await mongoose.connect(DB_URL);
    const filter_products = await Product_model.find({ category: category });
    // console.log(filter_products)
    mongoose.disconnect();
    return filter_products;
  } catch (error) {
    throw error;
  }
}

exports.get_product_byID = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid product ID');
    }
    await mongoose.connect(DB_URL);
    const products = await Product_model.findById(id);
    // find({ _id: id });
    // console.log(product_details)
    mongoose.disconnect();
    return products;
  }
  catch (error) {
    throw error;
  }
}
exports.get_uniqe_category = async () => {
  try {

    await mongoose.connect(DB_URL);
    const categories = await Product_model.distinct('category');
    mongoose.disconnect();
    return categories;
  }
  catch (error) {
    throw error;
  }
}