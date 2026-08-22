import {apiClient} from './client';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<UsersResponse>('/users');
    return response.data.data;
  },
};
