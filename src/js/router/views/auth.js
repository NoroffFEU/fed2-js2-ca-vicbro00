import { authGuard } from '../../utilities/authGuard.js';

export function initProtectedPage() {
    authGuard();
}