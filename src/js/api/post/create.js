/* Create posts */
export async function createPost({ title, body, tags, media }) {}

/* Fetch posts */
import { API_SOCIAL_POSTS, JWT_TOKEN } from "../constants.js";

const NEW_API_KEY = "e4a3887a-f09b-494b-b2eb-730b7132b79b";

async function fetchPosts() {
  const response = await fetch(`${API_SOCIAL_POSTS}`, {
    headers: {
      "X-Noroff-API-Key": NEW_API_KEY,
      "Authorization": `Bearer ${JWT_TOKEN}`,
    },
  });
  const { data } = await response.json();
  return data;
}

fetchPosts().then(console.log).catch(console.error);