import {apiClient} from './client';
import type {Contact} from '@/db/schema';

export interface MessagesResponse {
  success: boolean;
  data: Contact[];
}

export interface UpdateStatusResponse {
  success: boolean;
  data: Contact;
}

export const messagesApi = {
  getAll: async (): Promise<Contact[]> => {
    const response = await apiClient.get<MessagesResponse>('/contact');
    return response.data.data;
  },
  
  updateStatus: async (id: number, status: 'new' | 'read' | 'replied'): Promise<Contact> => {
    const response = await apiClient.patch<UpdateStatusResponse>(`/contact/${id}`, { status });
    return response.data.data;
  },
};
