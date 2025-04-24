const db = require('../db/index.js');

// 获取用户信息
exports.getUsersInfo = (req, res) => {
    const sql = 'SELECT * FROM user';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('查询错误:', err);
            return res.status(500).json({ error: '数据库查询失败' });
        }
        res.json(rows);
    });
}

// 更新用户信息
exports.revisionUserInfo = (req, res) => {
    const data = req.body;
    // 动态构建 SET 部分
    const setClause = Object.keys(data)
        .map(key => `${key} = ?`)
        .join(', ');

    const values = Object.values(data);
    values.push(1); // 添加 WHERE 条件的值

    const sql = `UPDATE user SET ${setClause} WHERE id = ?`;

    db.run(sql, values, function (err) {
        if (err) {
            console.error('更新错误:', err);
            return res.status(500).json({ error: '更新用户信息失败' });
        }
        res.json({
            message: 'success',
            changes: this.changes // 返回受影响的行数
        });
    });
}