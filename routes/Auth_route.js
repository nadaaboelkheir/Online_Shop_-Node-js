const express = require('express');
const router = express.Router()
const Auth_controller = require('../controllers/Auth_controller');
const bodyParser = require('body-parser');
router
    .get('/signup', Auth_controller.get_signup)
    .post('/signup', bodyParser.urlencoded({extended:true}),Auth_controller.post_signup)
    .get('/login', Auth_controller.get_login)
    .post('/login', bodyParser.urlencoded({extended:true}),Auth_controller.post_login)
module.exports = router;
