const Auth_model = require('../models/Auth_model')

exports.get_signup = async (req, res, next) => {

    try {
        res.render("signup")
    }
    catch (err) {
        next(err);
    }
}
exports.get_login = async (req, res, next) => {

    try {
        res.render("login")
    }
    catch (err) {
        next(err);
    }
}
exports.post_signup = async (req, res, next) => {

    try {
        let username = req.body.username
        let email = req.body.email
        let password = req.body.password
        const user = await Auth_model.create_NewUser(username, email, password)
        res.redirect("login")

    }
    catch (err) {
        res.redirect("signup")
        next(err);
    }
}
exports.post_login = async (req, res, next) => {

    try {

    }
    catch (err) {
        next(err);
    }
}
