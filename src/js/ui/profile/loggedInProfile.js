export function profileLink(username) {
    const profileLink = document.createElement('a');
    profileLink.href = `/auth/profile.html?username=${encodeURIComponent(username)}`;
    profileLink.textContent = username;
    return profileLink;
}