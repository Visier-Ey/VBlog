const db = require('../db/index.js');

exports.getBlogs = async (req, res) => {

}

// about poetry
exports.getPoetry = async (req, res) => {
    const sql = 'SELECT * FROM poetry';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
}

exports.addPoetry = async (req, res) => {
    const sql = 'INSERT INTO poetry SET ?';
    const data = req.body;
    db.query(sql, data, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send('poetry added');
    });
}

exports.delPoetry = async (req, res) => {

}
// poetry end ----------------------------