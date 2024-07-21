// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    console.log("Creating users table if it doesn't exist...");
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blood TEXT(5) NOT NULL,
        sickness TEXT(20) NOT NULL,
        allergy TEXT(20) NOT NULL,
        emeContact TEXT(20) NOT NULL,
        hash TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error("Error creating users table:", err.message);
        } else {
            console.log("Users table created or already exists.");
        }
    });
});

const insertUser = (blood, sickness, allergy, emeContact,hash) => {
    const sql = `INSERT INTO users (blood, sickness, allergy, emeContact,hash) VALUES (?, ?, ?, ?,?)`;
    db.run(sql, [blood, sickness, allergy, emeContact,hash], function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
};

const getData = () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
        
            const result = {
                users: [],
                // Add more categories if needed
            };
        
            rows.forEach((row) => {
                result.users.push(row);
            });
        
            console.log(result);
            resolve(result);
        });
    });
};

module.exports = {
    db,
    insertUser,
    getData
};
