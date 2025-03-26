import { API_SOCIAL_POSTS, JWT_TOKEN } from "../../api/constants.js";

const NEW_API_KEY = "e4a3887a-f09b-494b-b2eb-730b7132b79b";
const feedContainer = document.getElementById("feedContainer");

async function fetchPosts() {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}`, {
            headers: {
                "X-Noroff-API-Key": NEW_API_KEY,
                "Authorization": `Bearer ${JWT_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        const { data } = await response.json();
        displayPosts(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        feedContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    }
}

function displayPosts(posts) {
    if (!posts.length) {
        feedContainer.innerHTML = "<p>No posts available.</p>";
        return;
    }

    feedContainer.innerHTML = ""; // Clear existing content

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // Access the media URL properly
        const imageUrl = post.media?.url && post.media.url !== "string" ? post.media.url : "default-placeholder.jpg";
        
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            ${post.media?.url ? `<img src="${imageUrl}" alt="${post.media.alt || 'Post Image'}">` : ""}
            <p><strong>Tags:</strong> ${post.tags ? post.tags.join(", ") : "No tags"}</p>
        `;

        feedContainer.appendChild(postElement);
    });
}

document.addEventListener("DOMContentLoaded", fetchPosts);