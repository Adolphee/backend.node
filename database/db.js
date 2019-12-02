const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',//'remotemysql.com',
  user: 'root',//'JON8XloLiA',
  database: 'sonnete', //'JON8XloLiA',
  password: 'root',//'5Knug1MWWL',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;