const db = require('../db/index.js');
const bcrypt = require('bcryptjs');
const {generateJWT, secretKey} = require('../jwt/index.js');
const {verify} = require("jsonwebtoken");
const {hashPassword} = require("mysql/lib/protocol/Auth");
const sendVisitorApplication = require('../email/index.js').sendVisitorApplication;
exports.visitorRegister = (req, res) => {
    const sql = 'SELECT * FROM visitorapplication WHERE account = ?';
    db.query(sql, [req.body.account], (err, result) => {
        if (err) {
            console.log(err);
            res.json({status: 'fail', message: 'something error!', error: err});
        }
        if (result.length === 0) {
            res.json({status: 'fail', message: 'no right application!'});
        } else {
            const sql = 'INSERT INTO visitors(account, password) VALUES(?, ?)';
            db.query(sql, [result[0].account, result[0].password], (err, result2) => {
                if (err) {
                    console.log(err);
                    res.json({status: 'fail', message: 'something error!', error: err});
                } else {
                    const sql = 'DELETE FROM visitorapplication WHERE account = ?';
                    db.query(sql, [result[0].account], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.json({status: 'fail', message: 'something error!', error: err});
                        }
                        res.json({status: 'success', message: 'register success!'});
                    });
                }
            });
        }
    });
}

exports.visitorApplicationApprove = (req, res) => {
    const account = req.query.account;
    const sql = 'SELECT * FROM visitorapplication WHERE account = ?';
    db.query(sql, [account], (err, result) => {
        if (err) {
            console.log(err);
            res.json({status: 'fail', message: 'something error!', error: err});
        }
        if (result.length === 0) {
            res.json({status: 'fail', message: 'no right application!'});
        } else {
            const sql = 'INSERT INTO visitors(account, password) VALUES(?, ?)';
            db.query(sql, [result[0].account, result[0].password], (err, result2) => {
                if (err) {
                    console.log(err);
                    res.json({status: 'fail', message: 'something error!', error: err});
                } else {
                    const sql = 'DELETE FROM visitorapplication WHERE account = ?';
                    db.query(sql, [result[0].account], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.json({status: 'fail', message: 'something error!', error: err});
                        }
                        res.json({status: 'success', message: 'register success!'});
                    });
                }
            });
        }
    });
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
            sql = 'SELECT * FROM visitorapplication WHERE account = ?';
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
                const token = generateJWT({account: result[0].account, password: result[0].password});
                res.json({status: 'success', message: 'login success!', token: token, data: result[0]});
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
    let sql = 'SELECT * FROM visitorapplication WHERE account = ?';
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
                    sql = 'INSERT INTO visitorapplication(account, password) VALUES(?, ?)';
                    db.query(sql, [account, hash], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        sendVisitorApplication("3971033901@qq.com", {account: account, password: password});
                        res.json({status: 'success', message: 'application send success!'});
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

exports.getVisitorProfile = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verify(token, secretKey);
    const account = decoded.account;
    const sql = 'SELECT * FROM visitors WHERE account = ?';
    db.query(sql, [account], (err, result) => {
        if (err) {
            console.log(err);
            res.json({status: 'fail', message: 'something error!'});
        }
        res.json({status: 'success', data: result[0]});
    });
}

exports.updateVisitorProfile = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verify(token, secretKey);
    const account = decoded.account;
    let password = req.body.password;
    if (password) {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
    } else {
        password = decoded.password;
    }
    const nick = req.body.nick;
    const sql = 'UPDATE visitors SET ? WHERE account = ?';
    db.query(sql, [{password, nick}, account], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({status: 'success', message: 'update success!'});
    });
}