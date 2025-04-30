// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  // Extract just the filename or route portion
  const route = pathname.split('/').pop() || 'index.html';

  switch (route) {
    case 'index.html':
      await import('../views/home.js');
      break;

    case 'login.html':
      await import('../views/login.js');
      initLoginForm();
      break;

    case 'register.html':
      await import('../views/register.js');
      initRegisterForm();
      break;

    case 'profile.html':
      await import('../views/profilePage.js');
      // Profile-specific initialization
      break;

    case 'create.html': // Assuming this is your post creation page
      await import('../views/postCreate.js');
      initPostCreateView();
      break;

    case 'edit.html': // Assuming this is your post edit page
      await import('../views/postEdit.js');
      initEditPostPage();
      break;

    case 'feed.html':
      await import('../views/feed.js');
      await fetchAndDisplayPosts();
      break;

    case 'individual-post.html':
      await import('../views/individualPost.js');
      // Individual post initialization
      break;

    default:
      console.warn('No route match found for', pathname);
      break;
  }
}