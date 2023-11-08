const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({path: './.env'}); 


//Establish and connect to DB
const db = mysql.createConnection({
    host: process.env.DATABASE_EVENT_HOST,
    user: process.env.DATABASE_EVENT_USER,
    password: process.env.DATABASE_EVENT_PASSWORD,
    database: process.env.DATABASE_EVENT,
    timezone: 'Europe/Madrid',
});

db.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("MySQL Connected...");
    }
});

exports.db = db;

