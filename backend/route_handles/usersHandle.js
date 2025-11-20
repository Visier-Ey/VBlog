const fs = require('fs');
const path = require('path');
const { generateJWT } = require('../jwt');

const userJsonPath =  'Json/profile.json';

// 读取 JSON
function readJson() {
    const raw = fs.readFileSync(userJsonPath, 'utf-8');
    return JSON.parse(raw);
}

// 写入 JSON
function writeJson(data) {
    fs.writeFileSync(userJsonPath, JSON.stringify(data, null, 4), 'utf-8');
}

// 获取用户信息
exports.getUsersInfo = (req, res) => {
    try {
        const data = readJson();
        res.json(data);
    } catch (err) {
        console.error('读取 JSON 失败:', err);
        res.status(500).json({ error: '读取用户信息失败' });
    }
};

exports.revisionUserInfo = (req, res) => {
    try {
        const updateData = req.body;
        const data = readJson();

        const user = data.user;
        if (!user) {
            return res.status(404).json({ error: '用户不存在' });
        }

        Object.keys(updateData).forEach(key => {
            user[key] = updateData[key];
        });

        writeJson(data);

        res.json({
            message: 'success',
            changes: 1
        });
    } catch (err) {
        console.error('写入 JSON 失败:', err);
        res.status(500).json({ error: '更新用户信息失败' });
    }
};

exports.login = (req, res) => {
    try {
        const { password } = req.body;
        const data = readJson();
        const user = data.user;
        if (user.password === password) {
            const jwt = generateJWT(user);
            res.json({
                message: '登录成功',
                token: jwt,
                success: true
            });
        }
        else {
            res.json({
                message: '密码错误',
                success: false
            });
        }
    } catch (err) {
        console.error('读取 JSON 失败:', err);
        res.status(500).json({ error: '登录失败' });
    }
};