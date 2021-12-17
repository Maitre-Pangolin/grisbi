import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
  refreshTokens,
} from "../services/tokenService";

export const getCategories = () => axios.get("/api/categories");

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(async (req) => {
  let accessToken = getAccessToken();
  if (isTokenExpired(accessToken)) {
    await refreshTokens(getRefreshToken());
    accessToken = getAccessToken();
  }
  req.headers.Authorization = `Bearer ${accessToken}`;
  return req;
});

export const getExpensesByMonth = (keyMonth) =>
  axiosJWT.get(`/api/expenses/month/${keyMonth}`);

export const createExpense = (data) => axiosJWT.post(`api/expenses`, data);
export const putExpense = (id, data) =>
  axiosJWT.put(`api/expenses/${id}`, data);

export const deleteExpense = (id) => axiosJWT.delete(`api/expenses/${id}`);
