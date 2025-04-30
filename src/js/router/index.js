// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
    case '/index.html':
      await import('../views/home.js');
      break;

    case '/auth/login/index.html':
      await import('../views/login.js');
      break;

    case '/auth/register/index.html':
      await import('../views/register.js');
      break;

    case '/auth/profile.html':
      await import('../views/profilePage.js');
      break;

    case '/post/create/index.html':
      await import('../views/postCreate.js');
      break;

    case '/post/edit/index.html':
      await import('../views/postEdit.js');
      break;

    case '/post/feed.html':
      await import('../views/feed.js');
      break;

    case '/post/individual-post.html':
      await import('../views/individualPost.js');
      break;

    default:
      console.warn('No route match found for', pathname);
      break;
  }
}