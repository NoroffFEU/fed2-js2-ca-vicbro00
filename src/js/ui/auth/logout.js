import { refreshSideMenu } from '../../ui/components/sideMenu.js';

/**
 * Handles user logout by clearing session data and resetting application state
 * @returns {Promise<void>} Resolves after completing logout process
 */
export function logout() {
    const JWT_TOKEN = localStorage.getItem('JWT_TOKEN');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');


    ['JWT_TOKEN', 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));

    refreshSideMenu();
    window.location.href = '/fed2-js2-ca-vicbro00/index.html';
}