document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutButton');
  const signInButton = document.getElementById('signInButton');

  const isLoggedIn = localStorage.getItem('JWT_TOKEN');

  if (isLoggedIn) {
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        localStorage.removeItem('JWT_TOKEN');
        localStorage.removeItem('email');
        localStorage.removeItem('username');

        alert('You are now signed out!');

        window.location.href = '/index.html';
      });
    }
  } else {
    if (signInButton) {
      signInButton.addEventListener('click', () => {
        window.location.href = '/index.html';
      });
    }
  }
});
