import { loginUser } from '../../api/auth/login.js';

export function initLoginForm() {
    const form = document.forms.login;
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await loginUser(form.email.value.trim(), form.password.value);
            alert('Login successful!');
            window.location.href = '/fed2-js2-ca-vicbro00/index.html';
        } catch (error) {
            alert(error.message);
        }
    });
}