document.addEventListener("DOMContentLoaded", function () {
    // Render search results
    function renderSearchResults(results) {
      const searchResultsContainer = document.querySelector("#searchResults");
      searchResultsContainer.innerHTML = "";
  
      results.forEach((track) => {
        const listItem = document.createElement("div");
        listItem.innerHTML = `
          <label>
            <input type="checkbox" class="songCheckbox">
            ${track.title} by ${track.artist} (Album: ${track.album.title})
          </label>
        `;
        searchResultsContainer.appendChild(listItem);
  
        // Event listener for each checkbox
        const checkbox = listItem.querySelector(".songCheckbox");
        checkbox.addEventListener("change", function () {
          if (checkbox.checked) {
            addSongToList(track);
          } else {
            removeSongFromList(track);
          }
        });
      });
    }
  
    // Add a song to the selected songs list
    function addSongToList(track) {
      const selectedSongsContainer = document.querySelector("#selectedSongs");
      const listItem = document.createElement("li");
      listItem.textContent = `${track.title} by ${track.artist}`;
      // Store track ID so I can remove it later
      listItem.dataset.id = track.id;
      selectedSongsContainer.appendChild(listItem);
    }
  
    // Remove a song from the selected songs list
    function removeSongFromList(track) {
      const selectedSongsContainer = document.querySelector("#selectedSongs");
      const listItem = selectedSongsContainer.querySelector(`[data-id="${track.id}"]`);
      if (listItem) {
        selectedSongsContainer.removeChild(listItem);
      }
    }
  
    // Fetch tracks from the server
    async function fetchTracks(query) {
      try {
        // Our route for searching through the npm package, see searchRoute.js for more
        const response = await fetch(`/api/search/${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error(`Network error: ${response.statusText}`);
        }
        const results = await response.json();
        return results;
      } catch (error) {
        console.error("Error during fetch:", error);
        return [];
      }
    }
  
    // Event listener for searching by title
    document.querySelector("#titleBtn").addEventListener("click", async (event) => {
      event.preventDefault();
      const title = document.querySelector(".title").value.trim();
      if (title) {
        const results = await fetchTracks(title);
        renderSearchResults(results);
      }
    });
  
    // Event listener for searching by genre
    document.querySelector("#genreBtn").addEventListener("click", async (event) => {
      event.preventDefault();
      const genre = document.querySelector(".genre").value.trim();
      if (genre) {
        const results = await fetchTracks(genre);
        renderSearchResults(results);
      }
    });
  
    // Event listener for searching by artist
    document.querySelector("#artistBtn").addEventListener("click", async (event) => {
      event.preventDefault();
      const artist = document.querySelector(".artist").value.trim();
      if (artist) {
        const results = await fetchTracks(artist);
        renderSearchResults(results);
      }
    });
  
    // Event listener for searching by album
    document.querySelector("#albumBtn").addEventListener("click", async (event) => {
      event.preventDefault();
      const album = document.querySelector(".album").value.trim();
      if (album) {
        const results = await fetchTracks(album);
        renderSearchResults(results);
      }
    });
  });
  