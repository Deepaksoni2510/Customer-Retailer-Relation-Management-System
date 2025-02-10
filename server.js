const express = require("express");
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const signin = require("./login");
const registration = require("./register");
const retailer = require('./retailer')
const customerRoute = require('./customer');
const customer13Route = require('./customer13')


const app = express();
app.set('view engine', 'ejs')

app.use(session({
    secret: 'your_secret_key',
    resave: false,             
    saveUninitialized: true,   
    cookie: { secure: false }  
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.render('index.ejs');
});

app.get('/Customer1/Customer12', (req, res)=>{
    res.render('Customer12', {})
})


app.use(("/"), registration);
app.use(("/"), signin);
app.use("/", retailer);
app.use('/', customerRoute);
app.use('/Customer1', customer13Route);

app.listen(4500, () => {
    console.log("Server is running on port http://localhost:4500");
});