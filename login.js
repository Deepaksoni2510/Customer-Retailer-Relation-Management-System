const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db_config");
const path = require("path");

const route = express.Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.get("/login", (req, res) => {
    res.render("login");
});

route.post("/login", (req, res) => {
    const { username, idno, password, usertype } = req.body;
    const query = `
        SELECT * FROM users WHERE user_name = ? AND identity_no = ? AND user_pass = ? AND user_type = ?
    `;
    connection.query(query, [username, idno, password, usertype], (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.redirect("/login");
        }
        console.log(result.length)
        if (result.length > 0) {
            req.session.username = username;
            req.session.userID = result[0].id;
            switch (usertype) {
                case "Customer":
                    return res.redirect("/Customer1");
                case "Retailer":
                    return res.redirect("/retailer1");
                default:
                    return res.redirect("/login");
            }
        } else {
            console.log("Invalid credentials");
            return res.redirect("/");
        }
    });
});

route.get("/Customer1", (req, res) => {
    res.render('Customer1', {users: req.session.username});
});

route.get("/retailer1", (req, res) => {
    res.render('retailer1');
});

route.get("/register", (req, res) => {
    res.render('register');
});

module.exports = route;