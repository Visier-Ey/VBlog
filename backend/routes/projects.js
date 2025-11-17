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

const { ProjectIntroUpload, ProjectAttachmentsUpload, ProjectCoverUpload } = require('../multer/index');

// 获取所有项目
router.get('/list', getProjects);

// 添加新项目
router.post('/add', addProject);

// 更新项目
router.put('/update/:id', updateProject);

// 删除项目
router.delete('/delete/:id', deleteProject);

router.post('/uploadIntro/:id', ProjectIntroUpload, uploadIntroFile);

router.post('/uploadAttachments/:id', ProjectAttachmentsUpload, uploadAttachments);

router.post('/uploadCover/:id', ProjectCoverUpload, uploadCover);

module.exports = router;
