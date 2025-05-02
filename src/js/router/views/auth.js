import { authGuard } from '../../utilities/authGuard.js';

export function protectPage() {
    authGuard();
}