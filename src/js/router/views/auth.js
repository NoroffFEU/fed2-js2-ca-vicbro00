import { authGuard } from '../../utilities/authGuard.js'; // Import the auth guard

export function initProtectedPage() {
    authGuard();
}