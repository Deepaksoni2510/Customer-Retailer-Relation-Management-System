const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Deep@111",
    database: "proj"
});

connection.connect(function (error) {
    if (error) {
        console.error("Database connection failed: " + error.stack);
        return;
    }
    console.log("Connected to the database successfully!");
});

module.exports = connection;