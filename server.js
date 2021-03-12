const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db = new sqlite3.Database('./db/election.db', err => {
    if(err) {
        return console.error(err.message);
    }

    console.log('Connected to the election database');
})

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

// db.all(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
// })
//Default response for any other requests(Not Found) Catch all

//GET a single candidate
db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
})

//delete a candidate
db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
    if(err) {
        console.log(err);
    }
    console.log(result, this, this.changes);
})
app.use((req, res) => {
    res.status(404).end();
})

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.run(sql, params, function(err, result) {
    if(err) {
        console.log(err);
    }
    console.log(result, this.lastID)
})

db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})