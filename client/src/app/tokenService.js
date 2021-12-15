import jwt from "jsonwebtoken";
import { refresh } from "./api";

export const isTokenExpired = (token) => {
  const currentDate = new Date();
  const { exp } = jwt.decode(token);
  if (currentDate.getTime() > exp * 1000) return true;
};

export const setTokens = (tokens) => {
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

export const refreshTokens = async (refreshToken) => {
  if (isTokenExpired(refreshToken)) return clearTokens();

  const response = await refresh(refreshToken);
  const { "access-token": newAccessToken, "refresh-token": newRefreshToken } =
    response.headers;
  setTokens({ newAccessToken, newRefreshToken });
};

export const getAccessToken = () =>
  JSON.parse(localStorage.getItem("tokens"))?.accessToken;

export const getRefreshToken = () =>
  JSON.parse(localStorage.getItem("tokens"))?.refreshToken;

export const getTokens = () => JSON.parse(localStorage.getItem("tokens"));

export const getPayloadFromToken = (token) => {
  return jwt.decode(token);
};

export const clearTokens = () => {
  localStorage.removeItem("tokens");
};
