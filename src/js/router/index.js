// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case '/':
    case '/index.html':
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');
      break;

    case '/auth/login/index.html':
      // Load the login page script
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/index.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/register.js');
      await import('/fed2-js2-ca-vicbro00/src/router/views/login.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/login.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');

      break;

    case '/auth/register/index.html':
      // Load the register page script
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/register.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/register.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/register.js');

      break;

    case '/auth/profile.html':
      // Load the profile page script
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/index.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/register.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/create.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/delete.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/display.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/follow.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/posts.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/profile.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');

      break;

    case '/post/create/index.html':
      // Load the post creation page script
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/index.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/create.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/validate.js');
      await import('/fed2-js2-ca-vicbro00/src/router/views/auth.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/postCreate.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/post/create.js');
      await import('/fed2-js2-ca-vicbro00/src/js/utilities/authGuard.js');

      break;

    case '/post/edit/index.html':
      // Load the post edit page script
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/index.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/validate.js');
      await import('/fed2-js2-ca-vicbro00/src/router/views/auth.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/post/update.js');


      break;

    case '/post/feed.html':
      // Load the feed page script
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/api/auth/index.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/delete.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/display.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/follow.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/followers.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/posts.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/search.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/follow.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/post.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/profileSearch.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/posts.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/post/display.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/post/filter.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/post/search.js');

      break;

    case '/post/individual-post.html':
      // Load the individual post page script
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js');
      await import('/fed2-js2-ca-vicbro00/src/api/post/delete.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/follow.js');
      await import('/fed2-js2-ca-vicbro00/src/api/profile/followers.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/router/views/post.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/auth/logout.js');
      await import('/fed2-js2-ca-vicbro00/src/js/ui/components/posts.js');


      break;

    default:
      console.warn('No route match found for', pathname);
      break;
  }
}
