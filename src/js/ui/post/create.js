import { API_SOCIAL_POSTS, JWT_TOKEN, API_KEY } from "../../api/constants.js";

/**
 * Creates a post
 */
async function createPost(postData) {
    const token = localStorage.getItem(JWT_TOKEN);
    
    if (!token) {
        alert("Please log in to create a post");
        window.location.href = "/auth/login/index.html";
        return;
    }

    try {
        const response = await fetch(API_SOCIAL_POSTS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-Noroff-API-Key": API_KEY
            },
            body: JSON.stringify(postData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.errors?.[0]?.message || "Failed to create post");
        }

        alert("Post created successfully!");
        return result.data;
    } catch (error) {
        console.error("Error creating post:", error);
        alert(`Error: ${error.message}`);
        throw error;
    }
}

// Creates a form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContainer");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitButton = e.target.querySelector("button[type='submit']");
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = "Creating...";

            const postData = {
                title: document.getElementById("postTitle").value.trim(),
                body: document.getElementById("postBody").value.trim(),
                tags: document.getElementById("postTags").value
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(tag => tag.length > 0)
            };

            // Adds media field if valid URL is entered
            const mediaUrl = document.getElementById("postMediaUrl").value.trim();
            if (mediaUrl) {
                postData.media = {
                    url: mediaUrl,
                    alt: document.getElementById("postMediaAlt").value.trim() || ""
                };
            }

            // Validate required fields
            if (!postData.title || !postData.body) {
                throw new Error("Title and content are required");
            }

            await createPost(postData);
            form.reset();

            form.reset();
            alert("Post created successfully!");
            
        } catch (error) {
            console.error("Form submission error:", error);
            alert(`Error: ${error.message}`);

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Create Post";
        }
    });
});