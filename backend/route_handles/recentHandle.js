const db = require('../db/index.js');


exports.getRecentComments = async (req, res) => {
    const sql = 'SELECT * FROM recentcomments';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
}