import { initLoginForm } from './src/js/ui/auth/login.js';
import { initSideMenu } from './src/js/ui/components/sideMenu.js';
import { initRegisterForm } from './src/js/ui/auth/register.js';
import { JWT_TOKEN } from './src/js/api/constants.js';
import { displayPosts } from './src/js/ui/post/display.js';
import { initPostCreateView } from './src/js/router/views/postCreate.js';
import { fetchPostsWithAuthors } from './src/js/api/post/display.js';
import { fetchPostById, displayPost } from './src/js/router/views/post.js';
import { fetchProfileByName } from './src/js/ui/profile/profile.js';
import { displayUserPosts } from './src/js/router/views/profile.js';
import { fetchUserPostsByName } from './src/js/ui/profile/profile.js';
import { followUser, checkIfFollowing, unfollowUser } from './src/js/api/profile/follow.js';

// Initialize side menu and forms
initSideMenu();
initLoginForm();
initRegisterForm();

// Fetch and display posts
const posts = await fetchPostsWithAuthors();
displayPosts(posts);

// Initialize post creation view
initPostCreateView();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const username = urlParams.get('username');

if (postId) {
    const post = await fetchPostById(postId);
    displayPost(post);
} else {
    console.error("No post ID found in URL.");
}

// Logs out the user
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        [JWT_TOKEN, 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));
        window.location.href = '/index.html';
    });
}

if (username) {
    const profile = await fetchProfileByName(username);

    if (profile) {
        const profileNameElement = document.getElementById("profileName");
        const profileBioElement = document.getElementById("profileBio");

        if (profileNameElement) profileNameElement.innerText = profile.name || "Unknown User";
        if (profileBioElement) profileBioElement.innerText = profile.bio || "No bio available";

        const profileImageElement = document.getElementById("profileImage");
        if (profileImageElement && profile.avatar) {
            profileImageElement.src = profile.avatar.url || '';
            profileImageElement.alt = profile.avatar.alt || 'Profile Image';
        }

        const profileFollowerCountElement = document.getElementById("profileFollowerCount");
        if (profileFollowerCountElement) {
            let followerCount = profile._count.followers;
            profileFollowerCountElement.innerText = `${followerCount} Followers`;
        }

        const followButton = document.getElementById('followButton');
        if (followButton) {
            try {
                const isFollowing = await checkIfFollowing(username);
                updateFollowButton(followButton, isFollowing);
                
                followButton.addEventListener('click', async () => {
                    try {
                        followButton.disabled = true;
                        
                        if (followButton.classList.contains('following')) {
                            await unfollowUser(username);
                            updateFollowButton(followButton, false);
                            alert(`You have unfollowed ${username}`);
                        } else {
                            await followUser(username);
                            updateFollowButton(followButton, true);
                            alert(`You are now following ${username}`);
                        }

                        const updatedProfile = await fetchProfileByName(username);
                        if (updatedProfile && profileFollowerCountElement) {
                            const updatedFollowerCount = updatedProfile._count.followers;
                            profileFollowerCountElement.innerText = `${updatedFollowerCount} Followers`;
                        }

                    } catch (error) {
                        console.error("Error:", error);
                        alert(error.message);
                        const currentStatus = await checkIfFollowing(username);
                        updateFollowButton(followButton, currentStatus);
                    }
                });
            } catch (error) {
                console.error("Error checking follow status:", error);
                followButton.style.display = 'none';
            }
        }

        const userPosts = await fetchUserPostsByName(username);
        displayUserPosts(userPosts);
    }
}


function updateFollowButton(button, isFollowing) {
    button.disabled = false;
    if (isFollowing) {
        button.textContent = "Following";
        button.classList.add('following');
    } else {
        button.textContent = "Follow";
        button.classList.remove('following');
    }
}