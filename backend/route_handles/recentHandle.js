const db = require('../db/index.js');
const sourceBaseUrl = require('../config/index.js').serverBaseUrl;
const baseUrl = sourceBaseUrl + '/recentAndAbout/';


exports.getRecentNotices = async (req, res) => {
    const sql = 'SELECT * FROM recent where type = "notice" order by date desc';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        result.forEach((item) => {
            item.url = baseUrl + item.url;
        });
        res.json(result);
    });
}

exports.setRecentNotices = async (req, res) => {
    let sql = `INSERT INTO recent (content,url, type) VALUES ('${req.body.content || ''}', '${req.body.url || ''}', 'notice')`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
}

exports.getRecentEvents = async (req, res) => {
    const sql = 'SELECT * FROM recent where type = "event" order by date desc';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        result.forEach((item) => {
            item.url = baseUrl + item.url;
        });
        res.json(result);
    });
}

exports.setRecentEvents = async (req, res) => {
    let sql = `INSERT INTO recent (content,url, type) VALUES ('${req.body.content || ''}', '${req.body.url || ''}', 'event')`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    });
}

exports.getAbout = async (req, res) => {
    const sql = 'SELECT * FROM recent where type = "about"';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        result.forEach((item) => {
            item.url = baseUrl + item.url;
        });
        res.json(result);
    });
}