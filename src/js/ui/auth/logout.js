// Logout functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '/auth/login/index.html';
    });
}