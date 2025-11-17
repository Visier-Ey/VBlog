const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ==== 公共函数：确保目录存在 ====
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// ==== LifeChips 存储 ====
const LifeChipStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/LifeChips/');
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// ==== RecentEvent 存储 ====
const RecentEventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/recentAndAbout/');
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// ==== Projects 存储 ====
const ProjectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../public/projects/');
        ensureDir(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// ==== 导出上传中间件 ====

// LifeChips 单文件上传
exports.LifeChipsUpLoad = (req, res, next) => {
    if (!req.body.type) {
        return res.status(400).json({ message: 'error', error: 'type is required' });
    }
    const upload = multer({ storage: LifeChipStorage }).single('media');
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        if (req.file) req.body.url = req.file.filename;
        next();
    });
};

// RecentEvents 单文件上传
exports.RecentEventUpLoad = (req, res, next) => {
    const upload = multer({ storage: RecentEventStorage }).single('media');
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        if (req.file) req.body.url = req.file.filename;
        next();
    });
};

// Projects Cover 上传
exports.ProjectCoverUpload = (req, res, next) => {
    const upload = multer({ storage: ProjectStorage }).single('cover');
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        if (req.files) req.body.filenames = req.files.map(f => f.filename);
        next();
    });
};

// Projects 介绍文件上传（单文件）
exports.ProjectIntroUpload = (req, res, next) => {
    const upload = multer({ storage: ProjectStorage }).single('introFile');
    upload(req, res, (err) => {
        console.error('上传介绍文件失败:', err); // 这里打印完整错误堆栈
        if (err) return res.status(500).json({ error: err.message });
        if (req.file) req.body.filename = req.file.filename;
        next();
    });
};

// Projects 附件上传（多文件）
exports.ProjectAttachmentsUpload = (req, res, next) => {
    const upload = multer({ storage: ProjectStorage }).array('attachments');
    upload(req, res, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        if (req.files) req.body.filenames = req.files.map(f => f.filename);
        next();
    });
};
