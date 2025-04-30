// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const username = urlParams.get('username');

  switch (path) {
    case 'index.html':
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/login.js')
        .then(module => module.initLoginForm());
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/register.js')
        .then(module => module.initRegisterForm());
      break;

    case 'feed.html':
      const { fetchPostsWithAuthors, displayPosts, initPostSearch, filterPosts } = 
        await import('/fed2-js2-ca-vicbro00/src/js/ui/post/display.js');
      
      const posts = await fetchPostsWithAuthors();
      displayPosts(posts);
      initPostSearch(posts);
      filterPosts(posts);
      break;

    case 'create.html':
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/postCreate.js')
        .then(module => module.initPostCreateView());
      break;

    case 'edit.html':
      await import('/fed2-js2-ca-vicbro00/src/js/ui/profile/update.js')
        .then(module => module.initEditPostPage());
      break;

    case 'post.html':
      if (postId) {
        const { fetchPostById, displayPost } = 
          await import('/fed2-js2-ca-vicbro00/src/js/router/views/post.js');
        const post = await fetchPostById(postId);
        displayPost(post);
      } else {
        console.warn('Post ID not found in URL');
      }
      break;

    case 'profile.html':
      if (username) {
        const { fetchProfileByName, fetchUserPostsByName } = 
          await import('/fed2-js2-ca-vicbro00/src/js/ui/profile/profile.js');
        
        const profile = await fetchProfileByName(username);
        if (profile) {
          const profileName = document.getElementById('profileName');
          if (profileName) profileName.textContent = profile.name || 'Unknown User';

          const followButton = document.getElementById('followButton');
          if (followButton) {
            const { checkIfFollowing, followUser, unfollowUser } = 
              await import('/fed2-js2-ca-vicbro00/src/js/api/profile/follow.js');
            
            const isFollowing = await checkIfFollowing(username);
            updateFollowButton(followButton, isFollowing);

            followButton.addEventListener('click', async () => {
              try {
                followButton.disabled = true;
                if (isFollowing) {
                  await unfollowUser(username);
                  updateFollowButton(followButton, false);
                } else {
                  await followUser(username);
                  updateFollowButton(followButton, true);
                }
              } catch (error) {
                console.error('Follow error:', error);
              } finally {
                followButton.disabled = false;
              }
            });
          }

          const posts = await fetchUserPostsByName(username);
          const { displayUserPosts } = await import('/fed2-js2-ca-vicbro00/src/js/router/views/profile.js');
          displayUserPosts(posts);
        }
      }
      break;
  }
}

function updateFollowButton(button, isFollowing) {
  button.textContent = isFollowing ? 'Following' : 'Follow';
  button.classList.toggle('following', isFollowing);
}