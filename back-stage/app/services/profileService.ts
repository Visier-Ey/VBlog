import { get, post } from '../utils/http';

const API_BASE_URL = 'http://localhost:3000/backend';
const prefix_url = API_BASE_URL + '/user';

interface Profile {
  id: number;
  nick?: string;
  email?: string;
  role?: string;
  avatarUrl?: string;
  brief?: string;
  [key: string]: any;
}

interface RevisionResponse {
  message: string;
  changes: number;
}

interface LoginResponse {
  message: string;
  token: string;
  success: boolean;
}

const profileService = {
  /**
   * 获取用户信息
   */
  getUserProfile: async (): Promise<Profile> => {
    try {
      const response = await get<{ user: Profile }>(
        prefix_url + '/get'
      );
      return response.user;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      throw error;
    }
  },

  /**
   * 更新用户信息
   * @param updateData 要更新的字段对象
   */
  updateUserProfile: async (updateData: Partial<Profile>): Promise<RevisionResponse> => {
    try {
      const response = await post<RevisionResponse>(
        prefix_url + '/revision',
        updateData
      );
      return response;
    } catch (error) {
      console.error('更新用户信息失败:', error);
      throw error;
    }
  },
  /**
   * 用户登录
   * @param password 密码
   * @returns 登录响应
   */
  login: async (password: string): Promise<LoginResponse> => {
    try {
      const response = await post<LoginResponse>(
        prefix_url + '/login',
        { password }
      );
      return response;
    } catch (error) {
      console.error('用户登录失败:', error);
      throw error;
    }
  }
};

export type { Profile as UserProfile, RevisionResponse, LoginResponse };
export { profileService as profileService };
