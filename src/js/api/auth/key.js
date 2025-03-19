import { API_AUTH_KEY } from "../constants.js";
import { JWT_TOKEN } from "../constants.js";
import { API_KEY } from "../constants.js";

export async function getKey(name) {
    const response = await fetch(`${API_AUTH_KEY}`, {
      method: "GET",
      headers: {
              "Authorization": `Bearer ${JWT_TOKEN}`,
              "X-Noroff-API-Key": `${API_KEY}`,
              "Content-Type": "application/json"
          }
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch API key");
    }
  
    const data = await response.json();
    return data;
}

getKey();