import { API_KEY } from '../../api/constants';

export function initReactionButtons(refreshPostData) {
    document.addEventListener('click', async (event) => {
        const button = event.target.closest('.reaction-button');
        if (!button) return;

        const postId = button.dataset.postId;
        const symbol = button.dataset.symbol;

        if (!postId || !symbol) return;

        try {
            await handleReaction(postId, symbol);
            if (refreshPostData) {
                refreshPostData(postId);
            }
        } catch (error) {
            console.error("Error handling reaction:", error);
        }
    });
}

export async function handleReaction(postId, symbol) {
    console.log(`Reacting with ${symbol} to post ${postId}`);
    
    const response = await fetch(`https://v2.api.noroff.dev/social/posts/${postId}/react/${symbol}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`,
            'X-Noroff-API-Key': API_KEY,
        }
    });
    
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Failed to update reaction');
    }
    
    return await response.json();
}