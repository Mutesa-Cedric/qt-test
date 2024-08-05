import axios from "axios";
import { getCookie } from "./utils";

const token = getCookie("token");

const DEV_SERVER_URL = "http://localhost:8000";
const PROD_SERVER_URL = "https://api.example.com";

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ? PROD_SERVER_URL : DEV_SERVER_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default axiosInstance;
