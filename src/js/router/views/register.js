import { initRegisterForm } from '../../ui/auth/register.js';

// Initialize forms on register page
if (window.location.pathname.includes('register.html')) {
  initRegisterForm();
}
