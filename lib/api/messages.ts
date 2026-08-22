import {apiClient} from './client';
import type {Contact} from '@/db/schema';

export interface MessagesResponse {
  success: boolean;
  data: Contact[];
}

export const messagesApi = {
  getAll: async (): Promise<Contact[]> => {
    const response = await apiClient.get<MessagesResponse>('/contact');
    return response.data.data;
  },
};
