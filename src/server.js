const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3001;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'animal_tracking'
});

db.connect();

app.get('/api/animals', (req, res) => {
    db.query('SELECT * FROM animals', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
