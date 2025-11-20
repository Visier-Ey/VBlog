import { useState, useRef, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import type { Project } from '../../services/projectService';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: '',
    description: '',
    cover: '',
    introFile: '',
    githubLink: '',
    status: '进行中',
    createTime: '',
    lastUpdateTime: '',
    attachments: [],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');

  const introFileInputRef = useRef<HTMLInputElement | null>(null);
  const attachmentsInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [currentEditField, setCurrentEditField] = useState<
    'introFile' | 'attachments' | 'cover' | 'githubLink' | 'name' | 'description' | null
  >(null);

  const [editValue, setEditValue] = useState(''); // 用于编辑 name/description/githubLink
  const [githubEditValue, setGithubEditValue] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const list = await projectService.getProjects();
      setProjects(list);
    } catch (err) {
      console.error(err);
      showMessage('获取项目列表失败');
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  /** 搜索过滤 */
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status: Project['status']) => {
    switch (status) {
      case '进行中': return 'bg-blue-100 text-blue-800';
      case '已完成': return 'bg-green-100 text-green-800';
      case '暂停': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /** 添加项目 */
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name?.trim()) return showMessage('项目名称不能为空');

    try {
      const now = new Date().toISOString();
      const projectToAdd = {
        ...newProject,
        createTime: now,
        lastUpdateTime: now,
      };

      const addedProject = await projectService.addProject(projectToAdd);

      if (newProject.cover) await projectService.uploadCover(addedProject.id, newProject.cover);
      if (newProject.introFile) await projectService.uploadIntroFile(addedProject.id, newProject.introFile);
      if (newProject.attachments && newProject.attachments.length > 0)
        await projectService.uploadAttachments(addedProject.id, newProject.attachments);

      fetchProjects();
      setShowAddModal(false);
      setNewProject({ name: '', description: '', status: '进行中', attachments: [] });
      showMessage('项目添加成功');
    } catch (err) {
      console.error(err);
      showMessage('添加项目失败');
    }
  };

  /** 删除项目 */
  const handleDeleteProject = async (id: string) => {
    if (!confirm('确定删除该项目？')) return;

    try {
      await projectService.deleteProject(id);
      fetchProjects();
      showMessage('删除成功');
    } catch (err) {
      console.error(err);
      showMessage('删除失败');
    }
  };

  /** 修改状态 */
  const handleUpdateStatus = async (id: string, status: Project['status']) => {
    try {
      await projectService.updateProject(id, {
        status,
        lastUpdateTime: new Date().toISOString(),
      });
      fetchProjects();
    } catch (err) {
      showMessage('状态更新失败');
    }
  };

  /** 修改名称 & 描述 & GitHub */
  const handleSaveTextEdit = async () => {
    if (!currentEditId || !currentEditField) return;

    try {
      await projectService.updateProject(currentEditId, {
        [currentEditField]: editValue,
        lastUpdateTime: new Date().toISOString(),
      });

      fetchProjects();
      setCurrentEditId(null);
      setCurrentEditField(null);
      showMessage('更新成功');
    } catch (err) {
      console.error(err);
      showMessage('更新失败');
    }
  };

  /** 上传封面 */
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentEditId) return;

    try {
      await projectService.uploadCover(currentEditId, file);
      fetchProjects();
    } catch {
      showMessage('封面上传失败');
    } finally {
      setCurrentEditId(null);
      setCurrentEditField(null);
    }
  };

  /** 上传介绍文件 */
  const handleIntroFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentEditId) return;

    try {
      await projectService.uploadIntroFile(currentEditId, file);
      fetchProjects();
    } catch {
      showMessage('介绍文件上传失败');
    } finally {
      setCurrentEditId(null);
      setCurrentEditField(null);
    }
  };

  /** 上传附件 */
  const handleAttachmentsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0 || !currentEditId) return;

    try {
      await projectService.uploadAttachments(currentEditId, files);
      fetchProjects();
    } catch {
      showMessage('附件上传失败');
    } finally {
      setCurrentEditId(null);
      setCurrentEditField(null);
    }
  };

  // 文件单元格渲染
  const renderFileCell = (project: Project, field: 'introFile' | 'attachments') => {
    const has = field === 'introFile'
      ? !!project.introFile
      : project.attachments?.length > 0;

    const icon = has ? (field === 'introFile' ? '📄' : '📎') : '🗋';

    const click = () => {
      setCurrentEditId(project.id);
      setCurrentEditField(field);
      field === 'introFile'
        ? introFileInputRef.current?.click()
        : attachmentsInputRef.current?.click();
    };

    return (
      <td className="px-6 py-4 text-center cursor-pointer hover:bg-gray-100" onClick={click}>
        {icon}
      </td>
    );
  };

  // 渲染封面
  const renderCoverCell = (project: Project) => (
    <td
      className="px-6 py-4 text-center cursor-pointer hover:bg-gray-100"
      onClick={() => {
        setCurrentEditId(project.id);
        setCurrentEditField('cover');
        coverInputRef.current?.click();
      }}
    >
      {project.cover ? '🖼️' : '🗋'}
    </td>
  );

  // 渲染可编辑文本（名称、描述）
  const renderEditableText = (project: Project, field: 'name' | 'description') => (
    <td
      className="px-6 py-4 text-sm cursor-pointer hover:bg-gray-50"
      onClick={() => {
        setCurrentEditId(project.id);
        setCurrentEditField(field);
        setEditValue(project[field] || '');
      }}
    >
      {project[field] || '（空）'}
    </td>
  );

  // 渲染 GitHub
  const renderGithubCell = (project: Project) => (
    <td
      className="px-6 py-4 text-sm cursor-pointer hover:bg-gray-50 text-blue-600 underline"
      onClick={() => {
        setCurrentEditId(project.id);
        setCurrentEditField('githubLink');
        setEditValue(project.githubLink || '');
      }}
    >
      {project.githubLink || '未设置'}
    </td>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">项目管理</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          添加项目
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('成功') ? 'bg-green-100' : 'bg-red-100'}`}>
          {message}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="搜索项目名称或描述..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* 表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs text-gray-500">名称</th>
              <th className="px-6 py-3 text-xs text-gray-500">描述</th>
              <th className="px-6 py-3 text-xs text-gray-500">状态</th>
              <th className="px-6 py-3 text-xs text-gray-500">创建</th>
              <th className="px-6 py-3 text-xs text-gray-500">更新</th>
              <th className="px-6 py-3 text-xs text-gray-500 text-center">封面</th>
              <th className="px-6 py-3 text-xs text-gray-500 text-center">介绍文件</th>
              <th className="px-6 py-3 text-xs text-gray-500 text-center">附件</th>
              <th className="px-6 py-3 text-xs text-gray-500 text-center">GitHub</th>
              <th className="px-6 py-3 text-xs text-gray-500">操作</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredProjects.map(project => (
              <tr key={project.id}>
                {renderEditableText(project, 'name')}
                {renderEditableText(project, 'description')}

                <td className="px-6 py-4">
                  <select
                    value={project.status}
                    onChange={e => handleUpdateStatus(project.id, e.target.value as Project['status'])}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="进行中">进行中</option>
                    <option value="已完成">已完成</option>
                    <option value="暂停">暂停</option>
                  </select>
                </td>

                <td className="px-6 py-4 text-sm">
                  {new Date(project.createTime).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-sm">
                  {new Date(project.lastUpdateTime).toLocaleDateString()}
                </td>

                {renderCoverCell(project)}
                {renderFileCell(project, 'introFile')}
                {renderFileCell(project, 'attachments')}
                {renderGithubCell(project)}

                <td className="px-6 py-4">
                  <button
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 隐藏文件 input */}
      <input type="file" accept="image/*" ref={coverInputRef} className="hidden" onChange={handleCoverChange} />
      <input type="file" accept=".txt,.md" ref={introFileInputRef} className="hidden" onChange={handleIntroFileChange} />
      <input type="file" multiple ref={attachmentsInputRef} className="hidden" onChange={handleAttachmentsChange} />

      {/* 文本编辑弹窗（名称 / 描述 / GitHub） */}
      {currentEditField && ['name', 'description', 'githubLink'].includes(currentEditField) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">编辑 {currentEditField === 'name' ? '名称' :
              currentEditField === 'description' ? '描述' : 'GitHub 链接'}</h2>

            {currentEditField === 'description' ? (
              <textarea
                rows={4}
                className="w-full px-3 py-2 border rounded"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
              />
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => { setCurrentEditId(null); setCurrentEditField(null); }}
              >
                取消
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSaveTextEdit}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加项目弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">添加新项目</h2>
              <button onClick={() => setShowAddModal(false)}>×</button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4">
              <input
                type="text"
                placeholder="项目名称"
                required
                value={newProject.name}
                onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />

              <textarea
                placeholder="项目描述"
                value={newProject.description}
                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                rows={3}
              />

              <input
                type="text"
                placeholder="GitHub 链接（可选）"
                value={newProject.githubLink}
                onChange={e => setNewProject({ ...newProject, githubLink: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />

              {/* 封面 */}
              <div>
                <label className="block text-sm mb-1">封面</label>
                <label className="w-full px-3 py-2 border rounded bg-gray-50 cursor-pointer">
                  {newProject.cover ? newProject.cover.name : '选择封面图片'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setNewProject({ ...newProject, cover: file });
                    }}
                  />
                </label>
              </div>

              {/* 介绍文件 */}
              <div>
                <label className="block text-sm mb-1">介绍文件</label>
                <label className="w-full px-3 py-2 border rounded bg-gray-50 cursor-pointer">
                  {newProject.introFile ? newProject.introFile.name : '选择文件 (.txt/.md)'}
                  <input
                    type="file"
                    accept=".txt,.md"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) setNewProject({ ...newProject, introFile: file });
                    }}
                  />
                </label>
              </div>

              {/* 附件 */}
              <div>
                <label className="block text-sm mb-1">附件</label>
                <label className="w-full px-3 py-2 border rounded bg-gray-50 cursor-pointer">
                  {newProject.attachments?.length
                    ? `${newProject.attachments.length} 个文件`
                    : '选择多个文件'}
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={e =>
                      setNewProject({
                        ...newProject,
                        attachments: e.target.files ? Array.from(e.target.files) : [],
                      })
                    }
                  />
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
