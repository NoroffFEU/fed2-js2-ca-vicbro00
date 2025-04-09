// Header
export function createPostHeader(avatar, name, date) {
    return `
    <div class="post-header">
        <img src="${avatar}" alt="Author avatar" class="author-avatar">
        <div class="author-info">
            <p>Posted by: <span class="author-name">${name}</span></p>
            <span class="post-time">${date}</span>
        </div>
    </div>`;
}

// Footer (Tags)
export function createPostFooter(tags) {
    if (!tags?.length) return '';
    return `
    <div class="post-footer">
        <div class="post-tags">Tags: ${tags.join(", ")}</div>
    </div>`;
}

// Comments
export function createPostComments(comments) {
    if (!comments || comments.length === 0) {
        return `<p>No comments yet.</p>`;
    }

    return comments.map(comment => {
        const { author, body, created } = comment;
        const authorName = author?.name || "Anonymous";
        const commentDate = new Date(created).toLocaleString();
        
        return `
        <div class="comment">
            <div class="comment-author">${authorName}</div>
            <div class="comment-body">${body}</div>
            <div class="comment-date">${commentDate}</div>
        </div>`;
    }).join("");
}

// Reactions
export function createPostReactions(reactions, postId) {
    if (!reactions?.length) return '';
    
    return `
    <div class="post-reactions-container">
        <h3>Reactions:</h3>
        <div class="reaction-buttons">
            ${reactions.map(reaction => `
                <button class="reaction-button" 
                        data-post-id="${postId}" 
                        data-symbol="${reaction.symbol}"
                        aria-label="React with ${reaction.symbol}">
                    ${reaction.symbol} ${reaction.count}
                </button>
            `).join('')}
        </div>
    </div>`;
}