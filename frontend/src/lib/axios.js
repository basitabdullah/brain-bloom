import axios from "axios"


const axiosInstance = axios.create({
    baseURL : "https://brain-bloom-backned.vercel.app/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
      }
      
})

export default axiosInstance;