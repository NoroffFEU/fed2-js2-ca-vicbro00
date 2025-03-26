document.addEventListener('DOMContentLoaded', () => {
    const menuLoggedIn = document.getElementById('menuLoggedIn');
    const menuLoggedOut = document.getElementById('menuLoggedOut');
    const username = localStorage.getItem('username');

    if (username) {
        // User is logged in
        menuLoggedIn.innerHTML = `
            <a href="/">Home</a>
            <a href="post/feed.html">Feed</a>
            <a href="auth/profile.html">Profile</a>
            <a href="auth/register/index.html">Register new user</a>
            <a href="post/create/index.html">Create post</a>
            <p>Logged in as: <strong>${username}</strong> 
            <button id="logoutButton">Sign out</button></p>
        `;
        menuLoggedOut.style.display = 'none';
    } else {
        // User is not logged in
        menuLoggedOut.innerHTML = `
            <a href="/">Home</a>
            <a href="post/feed.html">Feed</a>
            <a href="auth/profile.html">Profile</a>
            <a href="auth/register/index.html">Register new user</a>
            <p>User not logged in</p>
            <a href="/auth/login/index.html"><button id="logoutButton">Sign in</button></a>
        `;
        menuLoggedIn.style.display = 'none';
    }
});