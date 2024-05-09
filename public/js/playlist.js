document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const trackId = button.getAttribute("data-trackId");
        const playlistId = button.getAttribute("data-playlistId");
  
        alert(`Deleting trackId ${trackId} from playlist ${playlistId}`);
      });
    });
  });