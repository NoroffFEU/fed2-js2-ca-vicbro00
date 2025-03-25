// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
        window.location.replace('/');
        return;
    }

    // Display user info
    if (user) {
        document.getElementById('welcomeMessage').textContent = `Welcome, ${user.name}`;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userAvatar').src = user.avatar?.url || 'default-avatar.jpg';
    }

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.replace('/');
    });
});