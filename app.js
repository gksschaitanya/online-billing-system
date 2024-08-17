const MySql = require('mysql');

const db = MySql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '2250', // replace with your MySQL password
    database: 'billing_system'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
/*
module.exports = db; 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db1 = require('./config/db'); // Import the database connection
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Example route to get products
app.get('/api/products', (req, res) => {
    db1.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Error fetching products');
        }
        res.json(results);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db1 = require('./config/db'); // Ensure this path is correct

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Online Billing System API');
});

// Example route to get products
app.get('/api/products', (req, res) => {
    db1.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send('Error fetching products');
        }
        res.json(results);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
