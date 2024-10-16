const mysql = require('mysql');
const { dbConfig } = require('../config');

const db = mysql.createPool(dbConfig);

// 对外暴露
module.exports = db;