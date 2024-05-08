document.addEventListener("DOMContentLoaded", function() {
    // Function to add selected song to the list
    function addSongToList(song) {
        const selectedSongsList = document.querySelector('#selectedSongs');
        const listItem = document.createElement('li');
        listItem.textContent = song;
        selectedSongsList.appendChild(listItem);
    }

    // Event listener for genre button
    genreBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const genre = genreInput.value.trim();
        if (genre !== '') {
            // Fetch songs based on genre and render search results
            const searchResults = fetchSongsByGenre(genre); // Example function call
            renderSearchResults(searchResults);
        }
    });

    // Event listener for artist button
    artistBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const artist = artistInput.value.trim();
        if (artist !== '') {
            // Fetch songs based on artist and render search results
            const searchResults = fetchSongsByArtist(artist); // Example function call
            renderSearchResults(searchResults);
        }
    });

    // Event listener for album button
    albumBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const album = albumInput.value.trim();
        if (album !== '') {
            // Fetch songs based on album and render search results
            const searchResults = fetchSongsByAlbum(album); // Example function call
            renderSearchResults(searchResults);
        }
    });

    // Function to render search results
    function renderSearchResults(results) {
        const searchResultsContainer = document.querySelector('#searchResults');
        searchResultsContainer.innerHTML = ''; // Clear previous results

        results.forEach(song => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <label>
                    <input type="checkbox" class="songCheckbox">
                    ${song}
                </label>
            `;
            searchResultsContainer.appendChild(listItem);

            // Add event listener to each checkbox
            const checkbox = listItem.querySelector('.songCheckbox');
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    addSongToList(song);
                } else {
                    // Remove from the selected songs list if unchecked
                    removeSongFromList(song);
                }
            });
        });
    }

    // Function to remove selected song from the list
    function removeSongFromList(song) {
        const selectedSongsList = document.querySelector('#selectedSongs');
        const items = selectedSongsList.getElementsByTagName('li');
        for (let i = 0; i < items.length; i++) {
            if (items[i].textContent === song) {
                selectedSongsList.removeChild(items[i]);
                break; // Exit loop once removed
            }
        }
    }
});
