const express = require('express');
const retailerRoute = express.Router();
const bodyParser = require('body-parser');
const connection = require('./db_config');

retailerRoute.use(bodyParser.urlencoded({ extended: false }));

retailerRoute.get('/retailer1/retailer11', (req, res) => {
    res.render('retailer11', {});
});

retailerRoute.get('/retailer1/retailer14', (req, res) => {
    res.render('retailer14', {});
});

retailerRoute.get('/retailer1/retailer12', (req, res) => {
    console.log('Entering retailer12 route');
    const query = 'SELECT customer_id, retailer_id, item_bought, DATE_FORMAT(bill_date, "%d/%m/%Y") as bill_date, DATE_FORMAT(warranty_date, "%d/%m/%Y") as warranty_date FROM purchases';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching product details:', err);
            return res.status(500).send('Error fetching product details');
        }
        
        console.log('Query results:', results);
        res.render('retailer12', { purchases: results });
    });
});

retailerRoute.get('/retailer1/retailer13', (req, res) => {
    const query = `
        SELECT problem_id, customer_id, retailer_id, item, problem, 
               DATE_FORMAT(bill_date, '%d/%m/%Y') AS bill_date, 
               DATE_FORMAT(complaint_date, '%d/%m/%Y') AS complaint_date 
        FROM problems
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching problems:', err);
            return res.status(500).send('Error fetching problems');
        }

        console.log('Query results:', results);
        res.render('retailer13', { problems: results }); 
    });
});


retailerRoute.get('/product-sold-form', (req, res) => {
    res.render('product-sold-form');
});

retailerRoute.post('/submit-product-sold', (req, res) => {
    const { customer_id, retailer_id, item_bought, bill_date, warranty_date } = req.body;

    const insertQuery = `INSERT INTO purchases (customer_id, retailer_id, item_bought, bill_date, warranty_date) VALUES (?, ?, ?, ?, ?)`;

    connection.query(insertQuery, [customer_id, retailer_id, item_bought, bill_date, warranty_date], (err, results) => {
        if (err) {
            console.error('Error while inserting the data:', err);
            return res.status(500).send('Error occurred while inserting data');
        }

        console.log('Data inserted successfully!');
        res.redirect('/retailer1/retailer12');
    });
});

module.exports = retailerRoute;