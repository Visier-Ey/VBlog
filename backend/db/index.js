const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// SQLite database file path (adjust as needed)
const dbPath = path.join(__dirname, '../../vblog.db');

// Create database connection
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Enable foreign key constraints
db.get("PRAGMA foreign_keys = ON");

// Export the database connection
module.exports = db;
