import { useState, useEffect } from 'react';
import { Link } from 'react-router';

export default function DashboardHome() {
  const [username, setUsername] = useState('管理员'); // SSR 安全默认值

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('username');
      if (name) setUsername(name);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        欢迎回来，{username}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link to="/profile" className="block p-5 bg-blue-50 rounded-lg hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">个人资料</h3>
              <p className="text-sm text-gray-500">查看和编辑您的个人信息</p>
            </div>
            <span className="text-2xl">👤</span>
          </div>
        </Link>
        
        <Link to="/projects" className="block p-5 bg-green-50 rounded-lg hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">项目管理</h3>
              <p className="text-sm text-gray-500">管理您的项目和任务</p>
            </div>
            <span className="text-2xl">📁</span>
          </div>
        </Link>
        
        <div className="p-5 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">系统概览</h3>
              <p className="text-sm text-gray-500">查看系统使用统计</p>
            </div>
            <span className="text-2xl">📊</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-medium text-gray-900 mb-4">快速操作</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <button 
              key={item}
              className="p-3 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              操作 {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}