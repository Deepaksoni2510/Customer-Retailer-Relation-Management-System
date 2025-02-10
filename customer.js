
const express = require('express');
const customerRoute = express.Router();
const bodyParser = require('body-parser');
const connection = require('./db_config');
const path = require('path');

customerRoute.use(bodyParser.urlencoded({ extended: false }));

customerRoute.get('/Customer1', (req, res)=>{
    res.render('Customer1')
})

customerRoute.get('/Customer1/Customer11', (req, res) => {

    const query = `
        SELECT customer_id, retailer_id, item_bought, 
               DATE_FORMAT(bill_date, "%d/%m/%Y") as bill_date, 
               DATE_FORMAT(warranty_date, "%d/%m/%Y") as warranty_date 
        FROM purchases
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching product details:', err);
            return res.status(500).send('Error fetching product details');
        }
        res.render('Customer11', { purchases: results });
    });
});


customerRoute.get('/Customer1/Customer13', (req, res) => {
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
customerRoute.post('/submit-complaint', (req, res) => {
    const { customer_id, retailer_id, item, problem, bill_date, complaint_date } = req.body;
    const insertQuery = `INSERT INTO problems (customer_id, retailer_id, item, problem, bill_date, complaint_date) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(insertQuery, [customer_id, retailer_id, item, problem, bill_date, complaint_date], (err, results) => {
        if (err) {
            console.error('Error while inserting complaint data:', err);
            return res.status(500).send('Error occurred while submitting complaint');
        }

        console.log('Complaint data inserted successfully!');
        res.redirect('/retailer1/retailer13');
    });
});

module.exports = customerRoute;