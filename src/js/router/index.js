// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':

    case '/index.html':
    case '/index':
      const home = await import('/fed2-js2-ca-vicbro00/views/home.js');
      home.init();
      break;

    case '/auth/login/index.html':
      const { initLoginPage } = await import('/fed2-js2-ca-vicbro00/ui/auth/login.js');
      initLoginPage();
      break;
    
    case '/auth/register/index.html':
      // Load the register page script
      const { initRegisterPage } = await import('/fed2-js2-ca-vicbro00/ui/register/index.js');
      initRegisterPage();
      break;

    case '/auth/profile.html':
      // Load the profile page script
      const { initProfilePage } = await import('/fed2-js2-ca-vicbro00/ui/profile/index.js');
      initProfilePage();
      break;

    case '/post/create/index.html':
      // Load the post creation page script
      const { initPostCreatePage } = await import('/fed2-js2-ca-vicbro00/ui/post/create.js');
      initPostCreatePage();
      break;

    case '/post/edit/index.html':
      // Load the post edit page script
      const { initPostEditPage } = await import('/fed2-js2-ca-vicbro00/ui/post/edit.js');
      initPostEditPage();
      break;

    case '/post/feed.html':
      // Load the feed page script
      const { searchProfiles } = await import('/fed2-js2-ca-vicbro00/ui/profile/profile.js');
      const { initpostSearch } = await import('/fed2-js2-ca-vicbro00/ui/post/search.js');
      await searchProfiles();
      await initpostSearch();
      break;

    case '/post/individual-post.html':
      // Load the individual post page script
      const { fetchPostById, displayPost } = await import('/fed2-js2-ca-vicbro00/router/views/post.js');
    
      const urlParams = new URLSearchParams(window.location.search);
      const postId = urlParams.get('id');

      if (postId) {
          const post = await fetchPostById(postId);
          displayPost(post);
      } else {
          console.error('No post ID found in URL.');
          const feedContainer = document.getElementById('feedContainer');
          if (feedContainer) {
              feedContainer.innerHTML = '<p>Post not found.</p>';
          }
      }
      break;

    default:
      console.warn('No route match found for', pathname);
      break;
  }
}