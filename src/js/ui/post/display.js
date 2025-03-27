import { API_SOCIAL_POSTS, JWT_TOKEN, API_KEY } from "../../api/constants.js";

const feedContainer = document.getElementById("feedContainer");

function displayPosts(posts) {
    if (!posts.length) {
        feedContainer.innerHTML = "<p>No posts available.</p>";
        return;
    }

    feedContainer.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

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
async function fetchPosts() {
    try {
        const response = await fetch(`${API_SOCIAL_POSTS}`, {
            headers: {
                "X-Noroff-API-Key": API_KEY,
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
document.addEventListener("DOMContentLoaded", fetchPosts);
