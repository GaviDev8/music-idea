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
    });
  }

  // Add a track to the selected songs list
  function addTrackToList(track) {
    // Checking for duplicates
    if (!selectedTracks.some((t) => t.title === track.title && t.artist === track.artist)) {
      selectedTracks.push(track);

      const $selectedSongsContainer = $("#selectedSongs");
      const $listItem = $(`
        <div class="selected-track" data-id="${track.id}">
          <button class="removeTrackBtn" data-id="${track.id}">
            ${track.title} by ${track.artist} (Album: ${track.album.title})
          </button>
        </div>
      `);
      $selectedSongsContainer.append($listItem);

      // Remove track from the list
      $listItem.find(".removeTrackBtn").on("click", function () {
        removeTrackFromList($(this).data("id"));
      });

      console.log("Added track:", track);
    } else {
      console.log("Track already selected:", track);
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
    console.log("Removed track with ID:", trackId);
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

  // Search handler function
  async function handleSearch(query) {
    if (query) {
      const results = await fetchTracks(query);
      renderSearchResults(results);
    }
  }

  // Search by title
  $("#titleBtn").on("click", async (event) => {
    event.preventDefault();
    const title = $(".title").val().trim();
    await handleSearch(title);
  });

  // Search by genre
  $("#genreBtn").on("click", async (event) => {
    event.preventDefault();
    const genre = $(".genre").val().trim();
    await handleSearch(genre);
  });

  // Search by artist
  $("#artistBtn").on("click", async (event) => {
    event.preventDefault();
    const artist = $(".artist").val().trim();
    await handleSearch(artist);
  });

  // Search by album
  $("#albumBtn").on("click", async (event) => {
    event.preventDefault();
    const album = $(".album").val().trim();
    await handleSearch(album);
  });

  // Add track to the list
  $("#searchResults").on("click", ".addTrackBtn", function () {
    const track = $(this).closest(".search-result").data("track");
    console.log("Trying to add track:", track);
    addTrackToList(track);
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
