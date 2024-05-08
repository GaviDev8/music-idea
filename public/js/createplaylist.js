$(document).ready(function () {
  // Render search results
  function renderSearchResults(results) {
    const $searchResultsContainer = $("#searchResults");
    $searchResultsContainer.empty();

    results.forEach((track) => {
      const $listItem = $(`
        <div>
          <label>
            <input type="checkbox" class="songCheckbox">
            ${track.title} by ${track.artist} (Album: ${track.album.title})
          </label>
        </div>
      `);
      $searchResultsContainer.append($listItem);

      // Event listener for each checkbox
      const $checkbox = $listItem.find(".songCheckbox");
      $checkbox.on("change", function () {
        if ($checkbox.is(":checked")) {
          addSongToList(track);
        } else {
          removeSongFromList(track);
        }
      });
    });
  }

  // Add a song to the selected songs list
  function addSongToList(track) {
    const $selectedSongsContainer = $("#selectedSongs");
    const $listItem = $(`
      <li data-id="${track.id}">
        ${track.title} by ${track.artist}
      </li>
    `);
    $selectedSongsContainer.append($listItem);
  }

  // Remove a song from the selected songs list
  function removeSongFromList(track) {
    const $selectedSongsContainer = $("#selectedSongs");
    const $listItem = $selectedSongsContainer.find(`[data-id="${track.id}"]`);
    $listItem.remove();
  }

  // Fetch from npm package
  async function fetchTracks(query) {
    try {
      // See searchRoute.js for more
      const response = await fetch(`/api/search/${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const results = await response.json();
      return results;
    } catch (error) {
      console.error("Error during fetch:", error);
      return [];
    }
  }

  // Search by title
  $("#titleBtn").on("click", async (event) => {
    event.preventDefault(); // Prevent form submission
    const title = $(".title").val().trim();
    if (title) {
      const results = await fetchTracks(title);
      renderSearchResults(results);
    }
  });

  // Search by genre
  $("#genreBtn").on("click", async (event) => {
    event.preventDefault(); // Prevent form submission
    const genre = $(".genre").val().trim();
    if (genre) {
      const results = await fetchTracks(genre);
      renderSearchResults(results);
    }
  });

  // Search by artist
  $("#artistBtn").on("click", async (event) => {
    event.preventDefault(); // Prevent form submission
    const artist = $(".artist").val().trim();
    if (artist) {
      const results = await fetchTracks(artist);
      renderSearchResults(results);
    }
  });

  // Search by album
  $("#albumBtn").on("click", async (event) => {
    event.preventDefault(); // Prevent form submission
    const album = $(".album").val().trim();
    if (album) {
      const results = await fetchTracks(album);
      renderSearchResults(results);
    }
  });
});