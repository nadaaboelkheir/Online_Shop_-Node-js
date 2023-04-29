const Auth_model = require('../models/Auth_model')

exports.get_signup = async (req, res, next) => {

    try {
        res.render("signup",{
            autherror:req.flash("autherror")[0]
        })
    }
    catch (err) {
        next(err);
    }
}
exports.get_login = async (req, res, next) => {

    try {
        res.render("login",{
            autherror:req.flash("autherror")[0]
        })
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
        req.flash("autherror",err.toString())
        res.redirect("signup")
        next(err);
    }
}
exports.login = async (req, res, next) => {

    try {
        let email = req.body.email
        let password = req.body.password
        const user_id = await Auth_model.login(email, password)
        req.session.user_id = user_id
        // save session
        res.redirect("/")
    
    }

    catch (err) {
        req.flash("autherror",err.toString())
        res.redirect("login")
        next(err);
    }
}
exports.logout = async (req, res, next) => {

    try {
        req.session.destroy(() => {
            res.redirect("login")
            console.log("success logout")
        })

    }

    catch (err) {
        res.redirect("/")
        next(err);
    }
}