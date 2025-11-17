const db = require('../db/index.js'); // 保持不动
const fs = require('fs');
const path = require('path');
const util = require('util');
const serverBaseUrl = require('../config').serverBaseUrl;
// promisify sqlite3 的方法
const dbAll = util.promisify(db.all.bind(db));
const dbGet = util.promisify(db.get.bind(db));
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this); // 可通过 this.lastID / this.changes
    });
  });
};

const withBaseUrl = (filePath) => {
  if (!filePath) return null;
  if (filePath.startsWith('http')) return filePath;
  return `${serverBaseUrl}/projects/${filePath}`;
};

// 获取所有项目
exports.getProjects = async (req, res) => {
  try {
    const projects = await dbAll('SELECT * FROM projects');

    const result = projects.map(p => {
      const attachments = p.attachments ? JSON.parse(p.attachments) : [];

      return {
        ...p,
        cover: withBaseUrl(p.cover),
        introFile: withBaseUrl(p.introFile),
        attachments: attachments.map(a => withBaseUrl(a)),
      };
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取项目列表失败' });
  }
};

// 添加项目
exports.addProject = async (req, res) => {
  try {
    const { name, description, status, createTime, lastUpdateTime } = req.body;
    const id = Date.now().toString();
    await dbRun(
      'INSERT INTO projects (id,name,description,githubLink,status,createTime,lastUpdateTime) VALUES (?,?,?,?,?,?,?)',
      [id, name, description, status, createTime, lastUpdateTime]
    );
    res.json({ id, name, description, status, createTime, lastUpdateTime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '添加项目失败' });
  }
};

// 更新项目
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const fields = Object.keys(updateData).map(k => `${k} = ?`).join(',');
    const values = Object.values(updateData);
    values.push(id);
    await dbRun(`UPDATE projects SET ${fields} WHERE id = ?`, values);
    res.json({ message: 'success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '更新项目失败' });
  }
};

async function deleteProjectFiles(id) {
  const project = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
  if (!project) return;

  if (project.introFile) {
    const introPath = path.join(__dirname, '../public/projects/', project.introFile);
    console.log('Deleting intro file:', introPath);
    if (fs.existsSync(introPath)) fs.unlinkSync(introPath);
  }

  const attachments = project.attachments ? JSON.parse(project.attachments) : [];
  console.log('Attachments to delete:', attachments);
  attachments.forEach(file => {
    const filePath = path.join(__dirname, '../public/projects/', file);
    console.log('Deleting attachment file:', filePath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  });
}


exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProjectFiles(id);
    await dbRun('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: '删除成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '删除项目失败' });
  }
};

// 上传Cover
exports.uploadCover = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    if (!file) return res.status(400).json({ error: '未上传Cover' });

    await dbRun('UPDATE projects SET cover = ? WHERE id = ?', [file.filename, id]);

    const project = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
    project.attachments = project.attachments ? JSON.parse(project.attachments) : [];
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '上传介绍文件失败' });
  }
};


// 上传介绍文件
exports.uploadIntroFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    if (!file) return res.status(400).json({ error: '未上传文件' });

    await dbRun('UPDATE projects SET introFile = ? WHERE id = ?', [file.filename, id]);

    const project = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
    project.attachments = project.attachments ? JSON.parse(project.attachments) : [];
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '上传介绍文件失败' });
  }
};

// 上传附件
exports.uploadAttachments = async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files;
    if (!files || files.length === 0) return res.status(400).json({ error: '未上传文件' });

    const project = await dbGet('SELECT * FROM projects WHERE id = ?', [id]);
    const oldAttachments = project.attachments ? JSON.parse(project.attachments) : [];
    const newAttachments = [...oldAttachments, ...files.map(f => f.filename)];

    await dbRun('UPDATE projects SET attachments = ? WHERE id = ?', [JSON.stringify(newAttachments), id]);
    project.attachments = newAttachments;
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '上传附件失败' });
  }
};
