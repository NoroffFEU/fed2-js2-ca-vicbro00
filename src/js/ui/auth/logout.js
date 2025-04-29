import { refreshSideMenu } from '../../ui/components/sideMenu.js';

/**
 * Handles user logout by clearing session data and resetting application state
 * @returns {Promise<void>} Resolves after completing logout process
 */
export function initLogout() {
    // Log user info
    const { JWT_TOKEN, userName, userEmail } = Object.fromEntries(
        ['JWT_TOKEN', 'userName', 'userEmail'].map(key => [key, localStorage.getItem(key)])
    );

    ['JWT_TOKEN', 'userName', 'userEmail'].forEach(key => localStorage.removeItem(key));

    // Update UI and redirect
    refreshSideMenu();
    window.location.href = '/fed2-js2-ca-vicbro00/index.html';
}