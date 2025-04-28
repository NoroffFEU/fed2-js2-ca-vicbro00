import { searchProfilesAPI } from '../../api/profile/search.js';
import { displaySearchResults } from '../../ui/profile/search.js';

export async function setupProfileSearch() {
    const searchForm = document.getElementById('profileSearchForm');
    const searchInput = document.getElementById('profileSearchInput');
    const searchResults = document.getElementById('searchResultsContainer');
    const feedContainer = document.getElementById('feedContainer');

    if (!searchForm || !searchInput || !searchResults || !feedContainer) return;

    let searchTimeout;
    const debounceTime = 300;

    searchInput.addEventListener('input', async (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length > 0) {
            feedContainer.style.display = 'none';
        } else {
            feedContainer.style.display = '';
        }

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        searchTimeout = setTimeout(async () => {
            try {
                searchResults.innerHTML = '<p class="search-loading">Searching...</p>';
                const results = await searchProfilesAPI(query);
                displaySearchResults(results);

            } catch (error) {
                searchResults.innerHTML = `<p class="search-error">Error: ${error.message}</p>`;
            }
        }, debounceTime);
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchInput.dispatchEvent(new Event('input'));
    });

    searchResults.addEventListener('click', (e) => {
        const card = e.target.closest('.profile-card');
        const image = e.target.closest('.profile-avatar');
        if (card || image) {
            const username = card ? card.dataset.username : image.dataset.username;
            if (username) {
                window.location.href = `/auth/profile.html?username=${encodeURIComponent(username)}`;
            }
        }
    });
}
