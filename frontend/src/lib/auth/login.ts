import { axiosInstance } from '../axios';
import { saveToken } from './token';

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/login', { email, password });
  saveToken(response.data.token);
  return response.data;
};
