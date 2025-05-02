import { logout } from '../../ui/auth/logout.js';

/**
 * Handles the logout view logic, calls logout functionality, and redirects to login page
 * @returns {Promise<void>} Resolves after completing logout process
 */
export async function logoutView() {
    await logout();
    window.location.href = '/fed2-js2-ca-vicbro00/login.html';
}
