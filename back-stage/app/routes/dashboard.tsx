import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';

const navItems = [
  { label: '首页', path: '/', icon: '🏠' },
  { label: '个人资料', path: '/profile', icon: '👤' },
  { label: '项目管理', path: '/projects', icon: '📁' },
  { label: '最近公告', path: '/recent', icon: '🌐' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState('管理员'); // 默认值，SSR 安全

  // 退出登录
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      navigate('/login');
    }
  };

  // 只在客户端读取 localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('username');
      if (name) setUsername(name);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* 侧边栏 */}
      <aside className={`bg-white shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className={`text-xl font-bold text-blue-600 truncate ${!isSidebarOpen && 'hidden'}`}>
            后台管理系统
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {isSidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg hover:bg-blue-50 text-gray-800 transition-colors duration-200"
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className={`${!isSidebarOpen && 'hidden'} truncate`}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
              {/* here! */}
        <div className="absolute bottom-0 w-full p-4 pointer-events-none">
          <div className={`flex items-center ${!isSidebarOpen && 'justify-center w-full'}`}>
            <span className="text-xl mr-3">👤</span>
            <div className={`${!isSidebarOpen && 'hidden'} flex flex-col`}>
              <span className="text-sm font-medium text-gray-700 truncate">{username}</span>
              <button 
                onClick={handleLogout}
                className="text-xs text-blue-600 hover:underline mt-1"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 border-b">
          <div className="text-lg font-semibold text-gray-900">控制面板</div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
              🔔
            </button>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
