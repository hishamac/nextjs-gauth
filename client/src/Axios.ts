import axios from "axios";

const Axios = axios.create({
    baseURL: "127.0.0.1:5000",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*",
  },
  withCredentials: true,
});

export default Axios;