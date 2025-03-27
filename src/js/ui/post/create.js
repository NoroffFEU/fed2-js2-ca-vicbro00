import { API_SOCIAL_POSTS, JWT_TOKEN } from "./constants.js";

/**
 * Creates a post
 */
export async function createPost(content) {
    const token = localStorage.getItem(JWT_TOKEN);

    if (!token) {
        alert("You must be logged in to create a post.");
        return;
    }

    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ content }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to create post");
        }

        alert("Post created successfully!");
        return result.data;
    } catch (error) {
        console.error("Error creating post:", error);
        alert(error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("postForm");

    if (postForm) {
        postForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const postContent = document.getElementById("postContent").value.trim();

            if (!postContent) {
                alert("Post content cannot be empty.");
                return;
            }

            const newPost = await createPost(postContent);

            if (newPost) {
                displayPost(newPost);
                document.getElementById("postContent").value = "";
            }
        });
    }
});