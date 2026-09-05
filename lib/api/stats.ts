import {apiClient} from './client';

export interface DashboardStats {
  users: {
    total: number;
    recent: number;
    growthPercentage: string;
    byRole: Record<string, number>;
  };
  messages: {
    total: number;
    recent: number;
    growthPercentage: string;
    new: number;
    read: number;
    replied: number;
    byService: Record<string, number>;
  };
}

export interface StatsResponse {
  success: boolean;
  data: DashboardStats;
}

export const statsApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<StatsResponse>('/dashboard/stats');
    return response.data.data;
  },
};
