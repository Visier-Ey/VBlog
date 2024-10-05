const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vblog'
});

// 对外暴露
module.exports = db;