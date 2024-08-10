import { axiosInstance } from "../axios";

export const register = async (name: string, email: string, password: string) => {
  const response = await axiosInstance.post("/register", { name, email, password });
  return response.data;
};
