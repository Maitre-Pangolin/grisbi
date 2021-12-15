import axios from "axios";

export const signin = (data) => axios.post("/api/signin", data);

export const refresh = (refreshToken) =>
  axios.post("/api/refresh", null, {
    headers: { "refresh-token": refreshToken },
  });

export const logout = (refreshToken) =>
  axios.delete("/api/logout", null, {
    headers: { "refresh-token": refreshToken },
  });
