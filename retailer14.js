const express = require('express');
const route = express.Router();
const connection = require('./db_config')

retailerRoute.get('/retailer1/retailer14', (req, res) => {
    res.render('retailer14', {});
});

route.post('/retailer14', (req, res) => {
    const {problem_id, customer_id, item, problem, solution} = req.body
    console.log(problem_id, customer_id, item, problem, solution)
    const query = `INSERT INTO status_(problem_id, customer_id, item, problem, solution)`;

    connection.query(query, [problem_id, customer_id, item, problem, solution], (err, results) => {
        console.log(results)
        if (err) {
            console.error('Error fetching status details:', err);
            return res.status(500).send('Error fetching status details');
        }
        res.render('retailer14');
    });
});

module.exports = route