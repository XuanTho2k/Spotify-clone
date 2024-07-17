import axios from "axios";
console.log(import.meta.env.VITE_DATABASE_URL);
export const instance = axios.create({
  baseURL: import.meta.env.VITE_DATABASE_URL,
});

export default instance;
