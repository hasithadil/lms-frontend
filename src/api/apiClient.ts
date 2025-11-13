import axios from "axios"

// 2. Create a custom(apiClient) with pre-set settings
const apiClient = axios.create({
    baseURL: "http://localhost:8080",           // Always call this number first
    headers: {
        "Content-Type": "application/json"       // Always say "I speak JSON"
    },
});

export default apiClient;