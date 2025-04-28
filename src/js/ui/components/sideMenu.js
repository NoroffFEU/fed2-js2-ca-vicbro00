import { profileLink } from '../../ui/profile/loggedInProfile.js';

let currentSideMenu = null;

export function createSideMenu() {
    if (currentSideMenu) {
        currentSideMenu.remove();
    }

    const username = localStorage.getItem('userName');
    const token = localStorage.getItem('JWT_TOKEN');
    const isLoggedIn = !!username;

    console.log('Is Logged In:', isLoggedIn ? 'Yes' : 'No');

    // Create menu element
    const sideMenu = document.createElement('div');
    sideMenu.id = 'sideMenu';
    sideMenu.classList.add('side-menu');

    // Menu content
    sideMenu.innerHTML = `
        <a href="/index.html">Home</a>
        <a href="/post/feed.html">Feed</a>
        ${isLoggedIn ? `
            <a href="/post/create/index.html">Create post</a>
            <button id="logoutButton" class="secondary-button">Sign out</button>
        ` : `
            <a href="/auth/register/index.html">Register new user</a>
            <p>User not logged in</p>
            <a href="/auth/login/index.html"><button id="loginButton" class="secondary-button">Sign in</button></a>
        `}
    `;

    // Append the profile link if the user is logged in
    if (isLoggedIn) {
        const profileLinkElement = profileLink(username);
        profileLinkElement.textContent = `Logged in as: ${username}`;
        profileLinkElement.style.display = 'block';
        sideMenu.insertBefore(profileLinkElement, document.getElementById('logoutButton'));
    }

    document.body.appendChild(sideMenu);
    currentSideMenu = sideMenu;

    setupMenuInteractions();
    return sideMenu;
}

function setupMenuInteractions() {
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const sideMenu = document.getElementById('sideMenu');

    if (!hamburgerIcon || !sideMenu) return;

    // Toggle menu visibility
    hamburgerIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        sideMenu.style.left = sideMenu.style.left === '0px' ? '-250px' : '0';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!sideMenu.contains(event.target) && event.target !== hamburgerIcon) {
            sideMenu.style.left = '-250px';
        }
    });

    // Add logout handler if button exists
    document.getElementById('logoutButton')?.addEventListener('click', handleLogout);
}

function handleLogout() {
    // Clear session data
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    // Refresh side menu (this will reset the UI state)
    createSideMenu();

    // Ensure that the side menu closes
    document.getElementById('sideMenu').style.left = '-250px';

    // Redirect to the home page
    window.location.href = '/index.html';
}

export const initSideMenu = createSideMenu;
export const refreshSideMenu = createSideMenu;
