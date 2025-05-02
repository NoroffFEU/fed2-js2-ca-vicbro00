import { displayUserPosts } from '../../router/views/profile.js';
import { followButton } from '../../components/followButton.js';

export async function loadProfileView(username) {
    const profile = await fetchProfileByName(username);

    if (profile) {
        const profileNameElement = document.getElementById('profileName');
        const profileBioElement = document.getElementById('profileBio');

        if (profileNameElement) profileNameElement.innerText = profile.name || 'Unknown User';
        if (profileBioElement) profileBioElement.innerText = profile.bio || 'No bio available';

        const profileImageElement = document.getElementById('profileImage');
        if (profileImageElement && profile.avatar) {
            profileImageElement.src = profile.avatar.url || '';
            profileImageElement.alt = profile.avatar.alt || 'Profile Image';
        }

        const profileFollowerCountElement = document.getElementById('profileFollowerCount');
        if (profileFollowerCountElement) {
            let followerCount = profile._count.followers;
            profileFollowerCountElement.innerText = `${followerCount} Followers`;
        }

        followButton(username);

        const userPosts = await fetchUserPostsByName(username);
        displayUserPosts(userPosts);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        loadProfileView(username);
    }
});
