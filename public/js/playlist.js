document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const trackId = button.getAttribute("data-trackId");
        const playlistId = button.getAttribute("data-playlistId");
  
        const playlistResponse = await fetch("/api/playlistTrack", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playlistId: playlistId, trackId: trackId }),
        });
        window.location.reload();
      });
    });
  });