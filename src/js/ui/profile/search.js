export function displaySearchResults(profiles, containerId = 'searchResultsContainer') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = profiles.length > 0
        ? profiles.map(profile => createProfileCard(profile)).join('')
        : '<p class="no-results">No profiles found matching your search</p>';
}

function createProfileCard(profile) {
    return `
    <div class="profile-card" data-username="${profile.name}">
        <img src="${profile.avatar?.url || 'default-avatar.jpg'}"
             alt="${profile.avatar?.alt || profile.name}'s avatar"
             class="profile-avatar"
             data-username="${profile.name}">
        <div class="profile-info">
            <h3>${profile.name}</h3>
            <p class="profile-bio">${profile.bio || 'No bio available'}</p>
            <div class="profile-stats">
                <span>${profile._count?.followers || 0} followers</span>
                <span>${profile._count?.following || 0} following</span>
            </div>
        </div>
    </div>`;
}