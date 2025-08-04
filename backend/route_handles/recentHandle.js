const db = require('../db/index.js');
const baseUrl = '/recentAndAbout/';

// 统一错误处理函数
const handleError = (err, res) => {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database operation failed', details: err.message });
};

// 获取最近通知
exports.getRecentNotices = async (req, res) => {
    try {
        const sql = 'SELECT * FROM recent WHERE type = ? ORDER BY date DESC';
        db.all(sql, ['notice'], (err, rows) => {
            if (err) return handleError(err, res);
            
            const result = rows.map(item => ({
                ...item,
                url: item.url ? baseUrl + item.url : null
            }));
            res.json(result);
        });
    } catch (err) {
        handleError(err, res);
    }
};

// 设置最近通知
exports.setRecentNotices = async (req, res) => {
    try {
        const { content = '', url = '' } = req.body;
        const sql = 'INSERT INTO recent (content, url, type) VALUES (?, ?, ?)';
        
        db.run(sql, [content, url, 'notice'], function(err) {
            if (err) return handleError(err, res);
            
            res.json({
                message: 'Notice added successfully',
                id: this.lastID
            });
        });
    } catch (err) {
        handleError(err, res);
    }
};

// 获取最近事件
exports.getRecentEvents = async (req, res) => {
    try {
        const sql = 'SELECT * FROM recent WHERE type = ? ORDER BY date DESC';
        db.all(sql, ['event'], (err, rows) => {
            if (err) return handleError(err, res);
            
            const result = rows.map(item => ({
                ...item,
                url: item.url ? baseUrl + item.url : null
            }));
            res.json(result);
        });
    } catch (err) {
        handleError(err, res);
    }
};

// 设置最近事件
exports.setRecentEvents = async (req, res) => {
    try {
        const { content = '', url = '' } = req.body;
        const sql = 'INSERT INTO recent (content, url, type) VALUES (?, ?, ?)';
        
        db.run(sql, [content, url, 'event'], function(err) {
            if (err) return handleError(err, res);
            
            res.json({
                message: 'Event added successfully',
                id: this.lastID
            });
        });
    } catch (err) {
        handleError(err, res);
    }
};

// 获取关于信息
exports.getAbout = async (req, res) => {
    try {
        const sql = 'SELECT * FROM recent WHERE type = ?';
        db.all(sql, ['about'], (err, rows) => {
            if (err) return handleError(err, res);
            
            const result = rows.map(item => ({
                ...item,
                url: item.url ? baseUrl + item.url : null
            }));
            res.json(result);
        });
    } catch (err) {
        handleError(err, res);
    }
};