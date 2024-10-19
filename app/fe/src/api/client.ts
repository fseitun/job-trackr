import api from "./api";
import { JobProcess, CreateJobProcess } from "../types";

const fetchAll = async (): Promise<JobProcess[]> => {
  const response = await api.get<JobProcess[]>("/job-processes");
  return response.data;
};

const login = async (email: string, password: string): Promise<string> => {
  const response = await api.post<{ token: string }>("/users/login", {
    email,
    password,
  });
  return response.data.token;
};

const register = async (email: string, password: string): Promise<void> => {
  await api.post("/users/register", { email, password });
};

const validateToken = async (): Promise<void> => {
  await api.get("/auth/validate-token");
};

const logout = async (): Promise<void> => {
  await api.post("/users/logout");
};

const get = async <T>(url: string): Promise<T> => {
  const response = await api.get<T>(url);
  return response.data;
};

const post = async (url: string, data: CreateJobProcess): Promise<void> => {
  await api.post(url, data);
};

const patch = async (url: string, data: CreateJobProcess): Promise<void> => {
  await api.patch(url, data);
};

const client = {
  fetchAll,
  get,
  post,
  patch,
  login,
  register,
  logout,
  validateToken,
};

export default client;
