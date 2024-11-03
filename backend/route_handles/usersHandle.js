const db = require('../db/index.js');
const sourceBaseUrl = require('../config/index.js').serverBaseUrl;
const baseUrl = sourceBaseUrl

// return the users' information
exports.getUsersInfo = (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
}

exports.revisionUserInfo = (req, res) => {
    const sql = 'UPDATE user SET ? WHERE id = 1';
    const data = req.body;
    db.query(sql, [data ], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({message: 'success'});
    });
}