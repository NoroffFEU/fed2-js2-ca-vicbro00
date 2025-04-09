import { comment } from 'postcss';
import { createPostHeader, createPostFooter, createPostComments, createPostReactions } from '../../ui/components/posts.js';

export function displayPosts(posts) {
    const feedContainer = document.getElementById("feedContainer");
    
    if (!feedContainer) return;
    
    feedContainer.innerHTML = posts.length
        ? posts.map(createPostHTML).join("")
        : "<p>No posts available.</p>";
}   

// Feed page link to individual post
function createPostHTML(post) {
    const { id, media, author, created, title, body, tags, reactions, comments } = post;
    const postUrl = `/post/individual-post.html?id=${id}`;

    const imageUrl = media?.url;
    const imageAlt = media?.alt || 'Post Image';
    const authorAvatar = author?.avatar?.url || 'default-avatar.jpg';
    const authorName = author?.name || "Unknown";
    const dateString = new Date(created).toLocaleString();

    return `
    <div class="post">
        <div class="post-header">
            ${createPostHeader(authorAvatar, authorName, dateString)}
        </div>
        <div class="post-content">
            <a href="${postUrl}" class="post-link">
                <h2>${title}</h2>
                ${imageUrl ? `<img src="${imageUrl}" alt="${imageAlt}" class="post-image">` : ''}  
            </a>
            <p>${body}</p>
            <div class="add-comment">
                <textarea id="commentBody" placeholder="Write a comment..."></textarea>
                <button id="submitComment">Submit Comment</button>
            </div>
        </div>
        ${createPostFooter(tags)}
        ${createPostComments(comments)}
        ${createPostReactions(reactions, id)}
    </div>`;
}

export async function createComment() {
    const commentBody = document.getElementById("commentBody").value;

    if(!commentBody.trim()) {
        alert("Please write a comment");
        return;
    }

    const url = `${API_BASE}/social/posts/${postId}/comment`;  // The API endpoint to post the comment
    const headers = {
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${JWT_TOKEN}`,
        "Content-Type": "application/json"  // Set content type for JSON data
    };

    const data = {
        body: commentBody
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)  // Send the comment data in the request body
        });

        if (!response.ok) throw new Error("Failed to post comment");  // Handle errors

        const result = await response.json();  // Get the response data (optional)
        console.log("Comment posted successfully", result);

        // Optionally, update the UI with the new comment (you may want to fetch the latest comments or add the comment directly to the UI)
        document.getElementById("commentBody").value = '';  // Clear the input field after submission
        alert("Comment posted successfully!");  // Notify the user

    } catch (error) {
        console.error("Error posting comment:", error);
        alert("An error occurred while posting your comment. Please try again.");
    }
    createComment();
}
