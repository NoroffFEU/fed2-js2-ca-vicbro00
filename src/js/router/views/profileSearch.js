import { searchProfilesAPI } from '../../api/profile/search.js';
import { displaySearchResults } from '../../ui/profile/search.js';

export async function setupProfileSearch() {
    const searchForm = document.getElementById('profileSearchForm');
    const searchInput = document.getElementById('profileSearchInput');
    const searchResults = document.getElementById('searchResultsContainer');
    
    if (!searchForm || !searchInput || !searchResults) return;

    let searchTimeout;
    const debounceTime = 300;

    searchInput.addEventListener('input', async (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            feedContainer.style.display = 'none';
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
}