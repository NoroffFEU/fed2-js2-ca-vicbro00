import { JWT_TOKEN } from '/fed2-js2-ca-vicbro00/src/js/api/constants.js';
import router from '/fed2-js2-ca-vicbro00/src/js/router/index.js';

function initGlobal() {
  import('/fed2-js2-ca-vicbro00/src/js/ui/components/sideMenu.js')
    .then(module => module.initSideMenu());

  import('/fed2-js2-ca-vicbro00/src/js/router/views/profileSearch.js')
    .then(module => module.setupProfileSearch());

  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      [JWT_TOKEN, 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));
      window.location.href = '/fed2-js2-ca-vicbro00/index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initGlobal();
  router();
});