const express = require("express")
const app = express()
const path = require("path")
const home_route = require('./routes/home_route')
const product_route = require('./routes/product_route')
const Auth_route = require('./routes/Auth_route')
const  session=require('express-session')
const StoreSession=require('connect-mongodb-session')(session) 
// constructor ==> storesession
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

const STORE = new StoreSession({
    uri :'mongodb://localhost:27017/Online_Shop'
    , collection:'sessions'
})

app.use(session({
    // fun ==> middleware
    secret: 'secret to hash express session'
    , saveUninitialized:false
    // ,cookie:{
    //     maxAge ,
    //     expires: new Date ()
    // defalt==> exit browser
    // }
    , store:STORE
}))

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use('/', home_route)
app.use('/product', product_route)
app.use('/', Auth_route)
app.listen(3000, (err) => {
    console.log("server listen on port 3000")
})