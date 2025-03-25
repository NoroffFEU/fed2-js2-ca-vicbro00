document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    // Validation
    if (!username || !email || !password) {
        showMessage('All fields are required', 'error');
        return;
    }

    if (!email.includes('@stud.noroff.no')) {
        showMessage('Email must end with @stud.noroff.no', 'error');
        return;
    }

    if (password.length < 8) {
        showMessage('Password must be at least 8 characters', 'error');
        return;
    }

    if (confirmPassword && password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    try {
        // Attempts registration
        const response = await fetch('https://v2.api.noroff.dev/auth/register', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': '9a919101-04d7-4ce4-ab4a-41d4e0211e7f'
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = data.errors?.[0]?.message || 
                           (data.statusCode === 409 ? 'Email already registered' : 'Registration failed');
            throw new Error(errorMsg);
        }

        showMessage('Registration successful! Redirecting to login...', 'success');
        
        setTimeout(() => {
            window.location.href = '/auth/login/index.html';
        }, 2000);

    } catch (error) {
        console.error('Registration error:', error);
        showMessage(error.message, 'error');
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = type;
}