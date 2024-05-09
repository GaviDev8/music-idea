$(document).ready(function () {
  let selectedTracks = [];

  // Render search results
  function renderSearchResults(results) {
    const $searchResultsContainer = $("#searchResults");
    $searchResultsContainer.empty();

    results.forEach((track) => {
      const $trackButton = $(`
        <div class="search-result">
          <button class="addTrackBtn">
            ${track.title} by ${track.artist} (Album: ${track.album.title})
          </button>
        </div>
      `);
      $trackButton.data("track", track);
      $searchResultsContainer.append($trackButton);

      // Event listener for each button
      $trackButton.find(".addTrackBtn").on("click", function () {
        addTrackToList($(this).closest(".search-result").data("track"));
      });
    });
  }

  // Add a track to the selected songs list
  function addTrackToList(track) {
    if (!selectedTracks.some((t) => t.id === track.id)) {
      selectedTracks.push(track);

      const $selectedSongsContainer = $("#selectedSongs");
      const $listItem = $(`
        <li data-id="${track.id}">
          ${track.title} by ${track.artist} (Album: ${track.album.title})
          <button class="removeTrackBtn">Remove</button>
        </li>
      `);
      $selectedSongsContainer.append($listItem);

      // Remove track from the list
      $listItem.find(".removeTrackBtn").on("click", function () {
        removeTrackFromList($(this).closest("li").data("id"));
      });
    }
  }

  // Remove a track from the selected songs list
  function removeTrackFromList(trackId) {
    selectedTracks = selectedTracks.filter((track) => track.id !== trackId);
    const $selectedSongsContainer = $("#selectedSongs");
    const $listItem = $selectedSongsContainer.find(`[data-id="${trackId}"]`);
    if ($listItem.length) {
      $listItem.remove();
    }
  }

  // Fetch tracks from the server
  async function fetchTracks(query) {
    try {
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

  // Search by title
  $("#titleBtn").on("click", async (event) => {
    event.preventDefault();
    const title = $(".title").val().trim();
    if (title) {
      const results = await fetchTracks(title);
      renderSearchResults(results);
    }
  });

  // Search by genre
  $("#genreBtn").on("click", async (event) => {
    event.preventDefault();
    const genre = $(".genre").val().trim();
    if (genre) {
      const results = await fetchTracks(genre);
      renderSearchResults(results);
    }
  });

  // Search by artist
  $("#artistBtn").on("click", async (event) => {
    event.preventDefault();
    const artist = $(".artist").val().trim();
    if (artist) {
      const results = await fetchTracks(artist);
      renderSearchResults(results);
    }
  });

  // Search by album
  $("#albumBtn").on("click", async (event) => {
    event.preventDefault();
    const album = $(".album").val().trim();
    if (album) {
      const results = await fetchTracks(album);
      renderSearchResults(results);
    }
  });

  // Save playlist button
  $("#savePlaylistBtn").on("click", async () => {
    const playlistTitle = prompt("Enter the playlist title:");
    if (!playlistTitle || !selectedTracks.length) {
      alert("Please enter a playlist title and select at least one song!");
      return;
    }

    try {
      // Create playlist
      const playlistResponse = await fetch("/api/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: playlistTitle }),
      });

      if (!playlistResponse.ok) {
        throw new Error(`Failed to create playlist: ${playlistResponse.statusText}`);
      }

      const playlist = await playlistResponse.json();

      // Create all tracks and associate with the playlist
      const trackPromises = selectedTracks.map((track) =>
        fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: track.title,
            artist: track.artist,
            album: track.album.title,
            imageURL: track.album.artwork,
            playlistId: playlist.id,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to create track: ${response.statusText}`);
            }
            return response.json();
          })
      );

      await Promise.all(trackPromises);

      // Redirect to the new playlist page using our uuid
      window.location.href = `/api/playlist/${playlist.publicId}`;
    } catch (error) {
      console.error("Error saving playlist:", error);
      alert("Failed to save the playlist.");
    }
  });
});