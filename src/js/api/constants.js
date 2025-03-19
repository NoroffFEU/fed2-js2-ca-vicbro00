// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = "3ca56afb-cddb-4ae2-91f7-d0946dbdb8f4";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

export const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmljQiIsImVtYWlsIjoidmljYnJvMDI0NThAc3R1ZC5ub3JvZmYubm8iLCJpYXQiOjE3NDIzNzk4MzV9.0ViSdQcosX6O7V0ZWaISp23_oAHU7-H9qd03M5F93IA";  

const options = {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${JWT_TOKEN}`,
        "X-Noroff-API-Key": `${API_KEY}`,
        "Content-Type": "application/json"
    }
};