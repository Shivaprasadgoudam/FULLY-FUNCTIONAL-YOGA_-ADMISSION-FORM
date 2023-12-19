const express = require('express');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const path = require('path'); // Add this line to include the path module

const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shivu@2002',
    database: 'yoga_classes_db'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    // Perform basic validations
    const { name, age, batch } = req.body;
    if (!name || !age || !batch) {
        return res.status(400).send('All fields are required.');
    }

    // Store data in the database
    const insertQuery = 'INSERT INTO yoga_participants (name, age, batch) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, age, batch], (err, result) => {
        if (err) {
            console.log('Error inserting data into the database:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Mock payment function
        // You can add your logic here for calling CompletePayment() function

        // Return response to the front-end
        res.send('Form submitted successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
