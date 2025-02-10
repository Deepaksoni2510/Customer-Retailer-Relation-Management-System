const express = require('express');
const route = express.Router();
const connection = require('./db_config')

route.get('/Customer13', (req, res) => {
    const query = `SELECT problem_id, customer_id, item, problem, solution FROM status_`;

    connection.query(query, (err, results) => {
        console.log(results)
        if (err) {
            console.error('Error fetching status details:', err);
            return res.status(500).send('Error fetching status details');
        }
        res.render('Customer13', { status: results });
    });
});

module.exports = route