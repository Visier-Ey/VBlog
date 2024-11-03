const db = require('../db/index.js');
const sourceBaseUrl = require('../config/index.js').serverBaseUrl;
const baseUrl = sourceBaseUrl + '/lifeChips/';

exports.getLifeChips = async (req, res) => {
    const sql = 'SELECT * FROM lifechips';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        result.forEach((item) => {
            item.url = baseUrl + item.url;
        })
        res.json(result);
    });
}

exports.addLifeChips = async (req, res) => {
    const sql = 'INSERT INTO lifechips (title, description, url ,content , type) VALUES (?, ?, ? ,? ,?)';
    db.query(sql, [req.body.title || 'BEST MEET', req.body.description || '', req.body.url || '', req.body.content || '', req.body.type], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send({message: 'success'});
    });
}