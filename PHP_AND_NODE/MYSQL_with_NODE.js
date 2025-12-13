const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_js'
});

con.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('MySQL connected successfully');
});

const create_table = () => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        course VARCHAR(255),
        mobile_no BIGINT,
        email VARCHAR(255)
    )`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Table created or already exists');
    });
};
// create_table();

const insert_data = () => {
    const sql = `INSERT INTO users (name, course, mobile_no, email) VALUES ?`;
    const values = [
        ['Jatin Jethava', 'MERN Stack', 1234567890, 'jatin@gmail.com'],
        ['yashdip jethava', 'Full Stack', 9876543210, 'yashdip@gmail.com']
    ];
    con.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log('Data inserted successfully');
    });
}
// insert_data();

const get_data = () => {
    const sql = `SELECT * FROM users`;
    con.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
    });
}
// get_data();

const update_data = (id) => {
    const sql = `UPDATE users SET mobile_no = ? WHERE id = ?`;
    const newMobileNo = 7048798733;
    con.query(sql, [newMobileNo, id], (err, result) => {
        if (err) throw err;
        console.log('Data updated successfully');
    });
}
// update_data(2);

const delete_data = (id) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    con.query(sql, [id], (err, result) => {
        if (err) throw err;
        console.log('Data deleted successfully');
    });
}
// delete_data(2);

// con.end();
