import { loginUser } from '../../api/auth/login.js';

export function initLoginPage() {
    initAuthLoginForm();
}

export function initAuthLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.removeEventListener('submit', handleLoginSubmit); 
    form.addEventListener('submit', handleLoginSubmit);
    
    console.log('Login form handler attached');
}

async function handleLoginSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const submitButton = e.target.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('loginMessage');

    try {
        validateInputs(email.value.trim(), password.value);

        submitButton.disabled = true;
        messageDiv.textContent = 'Logging in...';
        messageDiv.className = 'message-loading';

        const userData = await loginUser(email.value.trim(), password.value);
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!localStorage.getItem('JWT_TOKEN')) {
            throw new Error('Login session could not be established');
        }

        showSuccess(messageDiv, userData.name);
        setTimeout(() => window.location.href = '/fed2-js2-ca-vicbro00/index.html', 2000);

    } catch (error) {
        handleLoginError(error, messageDiv, email);
    } finally {
        submitButton.disabled = false;
    }
}

function validateInputs(email, password) {
    if (!email.endsWith('@stud.noroff.no')) {
        throw new Error('Please use your @stud.noroff.no email');
    }
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters');
    }
}

function showSuccess(messageDiv, username) {
    messageDiv.textContent = `Welcome ${username}! Redirecting...`;
    messageDiv.className = 'message-success';
}

function handleLoginError(error, messageDiv, emailInput) {
    console.error('Login error:', error);
    messageDiv.textContent = error.message;
    messageDiv.className = 'message-error';
    
    if (error.message.includes('@stud.noroff.no')) {
        emailInput.focus();
        emailInput.classList.add('input-error');
    }
    
    emailInput.form.password.value = '';
}