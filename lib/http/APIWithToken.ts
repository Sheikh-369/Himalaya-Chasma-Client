import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const APIWITHTOKEN = axios.create({
  baseURL: `${BASE_URL}/himalaya/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

APIWITHTOKEN.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default APIWITHTOKEN;