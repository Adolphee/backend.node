const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'sonnete',
  password: 'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;