import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

interface AuthResponse {
  user: any;
  token: string;
}

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (userData: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

export const resetPassword = async (userData: { email: string }) => {
  return axios.post(`${API_URL}/reset-password`, userData);
};
