document.addEventListener('DOMContentLoaded', function () {
    const source = document.getElementById("playlist-template").innerHTML;
    const template = Handlebars.compile(source);

    
    let playlists = [
        { title: "Song 1", artist: "Artist 1", album: "Album 1", imageURL : "https://via.placeholder.com/150" },
        { title: "Song 2", artist: "Artist 2", album: "Album 2", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 3", artist: "Artist 3", album: "Album 3", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 4", artist: "Artist 4", album: "Album 4", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 5", artist: "Artist 5", album: "Album 5", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 6", artist: "Artist 6", album: "Album 6" , imageURL: "https://via.placeholder.com/150"},
        { title: "Song 7", artist: "Artist 7", album: "Album 7", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 8", artist: "Artist 8", album: "Album 8" , imageURL: "https://via.placeholder.com/150"},
        { title: "Song 9", artist: "Artist 9", album: "Album 9" , imageURL: "https://via.placeholder.com/150"},
        { title: "Song 10", artist: "Artist 10", album: "Album 10", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 11", artist: "Artist 11", album: "Album 11", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 12", artist: "Artist 12", album: "Album 12" , imageURL: "https://via.placeholder.com/150"},
        { title: "Song 13", artist: "Artist 13", album: "Album 13", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 14", artist: "Artist 14", album: "Album 14", imageURL: "https://via.placeholder.com/150" },
        { title: "Song 15", artist: "Artist 15", album: "Album 15" , imageURL: "https://via.placeholder.com/150"},
        { title: "Song 16", artist: "Artist 16", album: "Album 16", imageURL: "https://via.placeholder.com/150"}
        // Add more playlist data as needed
    ];

    
    let userPlaylists = [];
    for (let i = 0; i < playlists.length; i += 4) {
        userPlaylists.push(playlists.slice(i, i + 4));
    }

    document.getElementById("playlistContainer").innerHTML = template({ userPlaylists: userPlaylists });
}); 