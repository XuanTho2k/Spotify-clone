import axios from "axios";
export const instance = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_URL,
});

export default instance;
