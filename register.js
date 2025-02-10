const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db_config");

const route = express.Router();

route.use(bodyParser.urlencoded({ extended: true }));

route.get("/register", function (req, res) {
    res.render('register');
});

route.post('/register', (req, res) => {
    const { username, idno, usertype, password } = req.body;

    console.log("Received registration data:", { username, idno, usertype, password });

    const query = `INSERT INTO users (user_name, identity_no, user_type, user_pass) VALUES (?, ?, ?, ?)`;

    connection.query(query, [username, idno, usertype, password], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            console.error("Error Code:", err.code);
            console.error("SQL State:", err.sqlState);
            console.error("Error Message:", err.sqlMessage);
            return res.status(500).send('Error registering user. Please try again later.');
        }
        console.log('User inserted successfully:', result);
        res.send('User successfully registered');
    });
});

module.exports = route;