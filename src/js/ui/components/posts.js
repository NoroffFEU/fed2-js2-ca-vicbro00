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
    if (!comments?.length) return '';
    return `
    <div class="post-comments">
        <h3>Comments:</h3>
        ${comments.map(comment => `
            <div class="comment">
                <p><strong>${comment.author.name}:</strong> ${comment.body}</p>
                <span class="comment-time">${new Date(comment.created).toLocaleString()}</span>
            </div>
        `).join('')}
    </div>`;
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