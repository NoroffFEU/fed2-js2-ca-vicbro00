// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':

    case '/index.html':
    case '/index':
      const home = await import('../views/home.js');
      home.init();
      break;

    case '/auth/login/index.html':
      // Load the login page script
      const { initLoginPage } = await import('../ui/login/index.js');
      initLoginPage();
      break;
    
    case '/auth/register/index.html':
      // Load the register page script
      const { initRegisterPage } = await import('../ui/register/index.js');
      initRegisterPage();
      break;

    case '/auth/profile.html':
      // Load the profile page script
      const { initProfilePage } = await import('../ui/profile/index.js');
      initProfilePage();
      break;

    case '/post/create/index.html':
      // Load the post creation page script
      const { initPostCreatePage } = await import('../ui/post/create.js');
      initPostCreatePage();
      break;

    case '/post/edit/index.html':
      // Load the post edit page script
      const { initPostEditPage } = await import('../ui/post/edit.js');
      initPostEditPage();
      break;

    case '/post/feed.html':
      // Load the feed page script
      const { initFeedPage } = await import('../ui/post/feed.js');
      initFeedPage();
      break;

    case '/post/individual-post.html':
      // Load the individual post page script
      const { initIndividualPostPage } = await import('../ui/post/individualPost.js');
      initIndividualPostPage();
      break;

    default:
      console.warn('No route match found for', pathname);
      break;
  }
}