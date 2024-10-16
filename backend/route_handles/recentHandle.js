const db = require('../db/index.js');


exports.getRecentComments = async (req, res) => {
    const sql = 'SELECT * FROM recentComments';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
}