import axios from "axios";

export const signin = (data) => axios.post("/api/signin", data);
export const signup = (data) => axios.post("/api/signup", data);
export const refresh = (refreshToken) =>
  axios.post(
    "/api/refresh",
    {},
    {
      headers: { "refresh-token": refreshToken },
    }
  );

export const logout = (refreshToken) =>
  axios.delete("/api/logout", {
    headers: { "refresh-token": refreshToken },
  });
