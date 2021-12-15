import axios from "axios";

export const signin = (data) => axios.post("/api/signin", data);
