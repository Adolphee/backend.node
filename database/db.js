const mysql = require('mysql2');

const db = mysql.createPool({
  host: 'remotemysql.com',
  user: 'JON8XloLiA',
  database: 'JON8XloLiA',
  password: '5Knug1MWWL',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db;