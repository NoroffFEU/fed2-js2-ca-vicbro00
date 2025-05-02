import { followUser, unfollowUser, checkIfFollowing } from '../../api/profile/follow.js';

export function followButton(username) {
    const followButton = document.getElementById('followButton');
    if (!followButton) return;

    async function updateFollowButton() {
        try {
            const isFollowing = await checkIfFollowing(username);
            followButton.textContent = isFollowing ? 'Following' : 'Follow';
            followButton.classList.toggle('following', isFollowing);
            followButton.disabled = false;
        } catch (error) {
            console.error('Error checking follow status:', error);
            followButton.style.display = 'none';
        }
    }

    followButton.addEventListener('click', async () => {
        followButton.disabled = true;
        try {
            if (followButton.classList.contains('following')) {
                await unfollowUser(username);
                alert(`You have unfollowed ${username}`);
            } else {
                await followUser(username);
                alert(`You are now following ${username}`);
            }
            updateFollowButton();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
            updateFollowButton();
        }
    });

    updateFollowButton();
}
