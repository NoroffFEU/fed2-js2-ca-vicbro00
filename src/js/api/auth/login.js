import { API_AUTH_LOGIN } from '../constants.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      console.error('Email and password are required');
      return;
    }

    try {
      const response = await fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email,
          password: password
        })
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || result.message || 'Login failed');
      }

      console.log('Login successful:', result);

      localStorage.setItem('jwt', result.data.accessToken);
      localStorage.setItem('email', email.toLowerCase());

      alert('You are now signed in!');
      window.location.href = '/index.html';

    } catch (error) {
      console.error('Login error:', error);
      alert(error.message || 'An error occurred. Please try again.');
    }
  });
});