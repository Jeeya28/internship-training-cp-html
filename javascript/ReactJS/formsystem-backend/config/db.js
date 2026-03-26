const mysql = require('mysql2');
require('dotenv').config();

//MySQL Connection Details
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    passowrd : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit: 0
});

const promisePool = pool.promise();

pool.getConnection((err,connection)=>{
    if(err){
        console.error('Error conencting to MySQL database',err.message);
        return;
    }
    console.log('MySQL Database connected Successfully');
    connection.release();
});

module.exports = promisePool;