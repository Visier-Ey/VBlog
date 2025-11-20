// GET /api/projects/list → 返回所有项目数组
// POST /api/projects/add → 添加新项目
// PUT /api/projects/update/:id → 更新项目
// DELETE /api/projects/delete/:id → 删除项目
// POST /api/projects/uploadIntro/:id → 上传介绍文件
// POST /api/projects/uploadAttachments/:id → 上传附件

import { get, post, put, del } from '../utils/http';

export interface Project {
  id: string;
  name: string;
  description: string;
  cover?: string;      // 封面图片
  introFile?: string;   // 文件名
  attachments?: string[]; // 多附件文件名
  githubLink?: string;
  status: '进行中' | '已完成' | '暂停';
  createTime: string;
  lastUpdateTime: string;
}

const API_BASE_URL = 'http://localhost:3000/backend';
const prefix_url = API_BASE_URL + '/projects';

export const projectService = {
  /**
   * 获取所有项目
   */
  getProjects: async (): Promise<Project[]> => {
    try {
      const res = await get<Project[]>(`${prefix_url}/list`);
      return res;
    } catch (err) {
      console.error('获取项目列表失败:', err);
      throw err;
    }
  },

  /**
   * 添加新项目
   */
  addProject: async (project: Partial<Project>): Promise<Project> => {
    try {
      const res = await post<Project>(`${prefix_url}/add`, project);
      return res;
    } catch (err) {
      console.error('添加项目失败:', err);
      throw err;
    }
  },

  /**
   * 更新项目
   */
  updateProject: async (id: string, updateData: Partial<Project>): Promise<Project> => {
    try {
      const res = await put<Project>(`${prefix_url}/update/${id}`, updateData);
      return res;
    } catch (err) {
      console.error('更新项目失败:', err);
      throw err;
    }
  },

  /**
   * 删除项目
   */
  deleteProject: async (id: string): Promise<{ message: string }> => {
    
    try {
      const res = await del<{ message: string }>(`${prefix_url}/delete/${id}`);
      return res;
    } catch (err) {
      console.error('删除项目失败:', err);
      throw err;
    }
  },
  /**
   * 上传Cover
   */
uploadCover: async (id: string, file: File): Promise<Project> => {
  try {
    const formData = new FormData();
    formData.append('cover', file); 

    const res = await post<Project>(`${prefix_url}/uploadCover/${id}`, formData);
    return res;
  } catch (err) {
    console.error('上传介绍文件失败:', err);
    throw err;
  }
}
,
  /**
   * 上传介绍文件
   */
uploadIntroFile: async (id: string, file: File): Promise<Project> => {
  try {
    const formData = new FormData();
    formData.append('introFile', file); 

    const res = await post<Project>(`${prefix_url}/uploadIntro/${id}`, formData);
    return res;
  } catch (err) {
    console.error('上传介绍文件失败:', err);
    throw err;
  }
}
,
  /**
   * 上传附件
   */
  uploadAttachments: async (id: string, files: File[]): Promise<Project> => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('attachments', file));
      const res = await post<Project>(`${prefix_url}/uploadAttachments/${id}`, formData);
      return res;
    } catch (err) {
      console.error('上传附件失败:', err);
      throw err;
    }
  },
};
