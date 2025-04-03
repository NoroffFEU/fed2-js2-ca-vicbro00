import { initLogout } from '../../ui/auth/logout.js';

/**
 * Handles the logout view logic, calls logout functionality, and redirects to login page
 * @returns {Promise<void>} Resolves after completing logout process
 */
export async function logoutView() {
    await initLogout();
    window.location.href = '/login.html';
}
