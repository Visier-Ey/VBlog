// backend/routes/projectsRouter.js
const express = require('express');
const router = express.Router();
const {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  uploadIntroFile,
  uploadAttachments,
  uploadCover
} = require('../route_handles/projectsHandle');
const { authenticateJWT } = require('../jwt/index.js');

const { ProjectIntroUpload, ProjectAttachmentsUpload, ProjectCoverUpload } = require('../multer/index');

// 获取所有项目
router.get('/list', getProjects);

// 添加新项目
router.post('/add', authenticateJWT, addProject);

// 更新项目
router.put('/update/:id', authenticateJWT, updateProject);

// 删除项目
router.delete('/delete/:id', authenticateJWT, deleteProject);

router.post('/uploadIntro/:id', authenticateJWT, ProjectIntroUpload, uploadIntroFile);

router.post('/uploadAttachments/:id', authenticateJWT, ProjectAttachmentsUpload, uploadAttachments);

router.post('/uploadCover/:id', authenticateJWT, ProjectCoverUpload, uploadCover);

module.exports = router;
