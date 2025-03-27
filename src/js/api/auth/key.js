import { API_AUTH, JWT_TOKEN } from "../constants.js";

/**
 * Sends a request to generate a new API key for the website.
 * @returns {Promise<Object>} A promise that resolves to an object containing the API key.
 * @throws {Error} Throws an error if the request fails.
 */
export async function getKey() {
  try {
    const response = await fetch(`${API_AUTH}/create-api-key`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${JWT_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "LinkUpAPIKey" }),
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.message || response.statusText}`);
        }

        const { data } = await response.json();
        return data; 
    } catch (error) {
        console.error("Error creating API key:", error);
        throw error; 
    }
}

getKey()
    .then((apiKeyData) => {
        console.log("API Key Generated:", apiKeyData.key);
    })
    .catch(console.error);