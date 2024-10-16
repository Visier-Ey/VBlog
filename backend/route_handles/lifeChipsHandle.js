const db = require('../db/index.js');
const sourceBaseUrl = require('../config/index.js').serverBaseUrl;
const baseUrl = sourceBaseUrl+ '/lifeChips/';

exports.getLifeChips = async (req, res) => {
    const sql = 'SELECT * FROM lifeChips';
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