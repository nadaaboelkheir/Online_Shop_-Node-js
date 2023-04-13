const express = require('express');
const router = express.Router()
const product_controller = require('../controllers/product_controller')
const home_controller = require('../controllers/home_controller')
router
    .get('/:id', product_controller.get_product_details)
    .get('/', home_controller.get_home)

module.exports = router;