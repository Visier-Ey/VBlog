import { useState } from 'react';
import { useNavigate } from 'react-router';
import { profileService } from '~/services/profileService';

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError('请输入密码');
      return;
    }

    try {
      const res = await profileService.login(password); 
      if (!res.success) {
        setError(res.message || '登录失败');
        return;
      }

      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isLoggedIn', 'true');
      }

      navigate('/');
    } catch (err: any) {
      setError(err?.message || '网络错误，请稍后再试');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            后台管理系统登录
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm">
            <label htmlFor="password" className="sr-only">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 
                         placeholder-gray-500 text-gray-900 focus:outline-none 
                         focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                         text-sm font-medium rounded-md text-white bg-blue-600 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-blue-500"
            >
              登录
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
