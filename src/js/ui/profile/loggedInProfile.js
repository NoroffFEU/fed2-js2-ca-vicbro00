export function profileLink(username) {
    const profileLink = document.createElement('a');
    profileLink.href = `/fed2-js2-ca-vicbro00/auth/profile.html?username=${encodeURIComponent(username)}`;
    profileLink.textContent = username;
    return profileLink;
}