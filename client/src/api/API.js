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

export const fetchExpensesByMonth = (keyMonth) =>
  axiosJWT.get(`/api/expenses/month/${keyMonth}`);
