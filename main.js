import { initLoginForm } from './src/js/ui/auth/login.js';
import { initSideMenu } from './src/js/ui/components/sideMenu.js';
import { JWT_TOKEN } from './src/js/api/constants.js';

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initSideMenu();
    initLoginForm();
    document.getElementById('logoutButton')?.addEventListener('click', () => {
        [JWT_TOKEN, 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));
        window.location.href = '/index.html';
    });
});