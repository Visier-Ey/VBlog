const db = require('../db/index.js');
const bcrypt = require('bcryptjs');
const generateJWT = require('../jwt/index.js').generateJWT;
exports.visitorRegister = (req, res) => {

}
exports.visitorLogin = (req, res) => {
    const account = req.body.account;
    const password = req.body.password;
    let sql = 'SELECT * FROM visitors WHERE account = ?';
    db.query(sql, [account], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // visitor does not exist, check the visitorApplication table
        if (result.length === 0) {
            sql = 'SELECT * FROM visitorApplication WHERE account = ?';
            db.query(sql, [account], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (result.length === 0) {
                    res.json({status: 'fail', message: 'account does not exist!'});
                } else {
                    res.json({status: 'fail', message: 'account in application!'});
                }
            });
        } else {
            const hash = result[0].password;
            if (bcrypt.compareSync(password, hash)) {
                const token = generateJWT({id: result[0].password, account: result[0].account});
                res.json({status: 'success', message: 'login success!', token: token});
            } else {
                res.json({status: 'fail', message: 'password error!'});
            }
        }
    });
}

exports.visitorApplication = (req, res) => {
    const account = req.body.account;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let sql = 'SELECT * FROM visitorApplication WHERE account = ?';
    db.query(sql, [account, hash], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        // visitorApplication does not exist, query the visitor table
        if (result.length === 0) {
            sql = 'SELECT * FROM visitors WHERE account = ?';
            db.query(sql, [account], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                // visitor does not exist, insert the application
                if (result.length === 0) {
                    sql = 'INSERT INTO visitorApplication(account, password) VALUES(?, ?)';
                    db.query(sql, [account, hash], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        res.json({status: 'success', message: 'application success!'});
                    });
                } else {
                    res.json({status: 'fail', message: 'account already exists!'});
                }
            });
        } else {
            res.json({status: 'fail', message: 'account in application!'});
        }
    });


}
