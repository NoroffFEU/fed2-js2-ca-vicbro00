import { registerUser } from '../../api/auth/register.js';

export function registerPage() {
  registerPage();
}

export function registerPage() {
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(registerForm);
      const userData = {
        name: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
      };
      const confirmPassword = formData.get('confirmPassword');

      try {
        if (!validateRegistration(userData, confirmPassword)) return;

        await registerUser(userData);

        showMessage('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => {
          window.location.href = '/fed2-js2-ca-vicbro00/auth/login/index.html';
        }, 2000);
      } catch (error) {
        showMessage(error.message, 'error');
        console.error('Registration error:', error);
      }
    });
  }
}

function validateRegistration({ name, email, password }, confirmPassword) {
  if (!name || !email || !password || !confirmPassword) {
    showMessage('All fields are required', 'error');
    return false;
  }

  if (!email.includes('@stud.noroff.no')) {
    showMessage('Email must end with @stud.noroff.no', 'error');
    return false;
  }

  if (password.length < 8) {
    showMessage('Password must be at least 8 characters', 'error');
    return false;
  }

  if (password !== confirmPassword) {
    showMessage('Passwords do not match', 'error');
    return false;
  }

  return true;
}

function showMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = type;
}