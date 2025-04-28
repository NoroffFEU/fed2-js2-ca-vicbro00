import { followUser, unfollowUser, checkIfFollowing } from "../../api/profile/follow";

/**
 * Initializes the follow/unfollow button on the profile page.
 * @param {string} username - The username of the user being followed/unfollowed.
 */
export async function initializeFollowButton(username) {
    const isFollowing = await checkIfFollowing(username);

    const followButton = document.getElementById('followButton');
    if (followButton) {
        if (isFollowing) {
            followButton.textContent = 'Unfollow';
        } else {
            followButton.textContent = 'Follow';
        }

        followButton.addEventListener('click', async () => {
            if (isFollowing) {
                await unfollowUser(username);
                followButton.textContent = 'Follow';
            } else {
                await followUser(username);
                followButton.textContent = 'Unfollow';
            }
        });
    }
}
