const db = require('../db/index.js');

const baseUrl = 'http://127.0.0.1:3000';


// return the avatar and frame urls
exports.profilesHandle = (req, res) => {
    const avatarUrl = `${baseUrl}/profiles/avatar.jpg`;
    const frameUrl = `${baseUrl}/profiles/frame.png`;
    res.json({ avatarUrl: avatarUrl,
               frameUrl: frameUrl
    });
}

// return the users' information
exports.usersHandle = (req, res) => {
    const sql = 'SELECT * FROM user';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
}