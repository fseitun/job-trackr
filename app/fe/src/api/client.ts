import { api } from "./api";

const fetchAll = async <T>(url: string): Promise<T[]> => {
  const response = await api.get<T[]>(url);
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

const post = async <T>(url: string, data: T): Promise<void> => {
  await api.post(url, data); // TODO: fix this on backend
};

const patch = async <T>(url: string, data: T, id: number): Promise<void> => {
  await api.patch(url, { data, id }); // TODO: fix this on backend
};

export const client = {
  fetchAll,
  get,
  post,
  patch,
  login,
  register,
  logout,
  validateToken,
};
