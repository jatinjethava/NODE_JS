const express = require('express');
const con = require('./config_mqsql');
const app = express();
const port = 8100;
app.use(express.json());


app.post('/insert', (req, res) => {
    const data = req.body;
    const sql = 'INSERT INTO users SET ?';
    con.query(sql, data, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
        } else {
            res.send('Data inserted successfully');
        }
    });
});


app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    con.query(sql, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
        } else {
            res.send(results);
        }
    });
});


app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const sql = 'UPDATE users SET ? WHERE id = ?';
    con.query(sql, [data, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating data');
        } else {
            res.send('Data updated successfully');
        }
    });
});


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    con.query(sql, id, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting data');
        } else {
            res.send('Data deleted successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});