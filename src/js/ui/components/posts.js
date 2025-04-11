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