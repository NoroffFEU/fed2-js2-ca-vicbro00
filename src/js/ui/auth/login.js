document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    
    // Hamburger icon and side menu elements
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const body = document.querySelector('body');

    // Function to create the side menu
    function createSideMenu(isLoggedIn) {
        const sideMenu = document.createElement('div');
        sideMenu.id = 'sideMenu';   
        sideMenu.classList.add('side-menu');

        let menuContent = '';
        if (isLoggedIn) {
            menuContent = `
                <a href="/index.html">Home</a>
                <a href="/post/feed.html">Feed</a>
                <a href="/auth/profile.html">Profile</a>
                <a href="/auth/register/index.html">Register new user</a>
                <a href="/post/create/index.html">Create post</a>
                <p>Logged in as: <strong>${username}</strong></p>
                <button id="logoutButton" class="secondary-button">Sign out</button>
            `;
        } else {
            menuContent = `
                <a href="/index.html">Home</a>
                <a href="/post/feed.html">Feed</a>
                <a href="/auth/profile.html">Profile</a>
                <a href="/auth/register/index.html">Register new user</a>
                <p>User not logged in</p>
                <a href="/auth/login/index.html"><button id="logoutButton">Sign in</button></a>
            `;
        }
        sideMenu.innerHTML = menuContent;
        body.appendChild(sideMenu);
        
        document.addEventListener('click', (event) => {
            if (!sideMenu.contains(event.target) && event.target !== hamburgerIcon) {
                sideMenu.style.left = '-250px';
            }
        });
    }

    if (username) {
        createSideMenu(true);
    } else {
        createSideMenu(false);
    }

    hamburgerIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        const sideMenu = document.getElementById('sideMenu');
        sideMenu.style.left = '0';
    });
});
