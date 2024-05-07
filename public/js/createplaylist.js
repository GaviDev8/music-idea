
<div>
    <h2>Create Playlist</h2>

    <section class="createPlaylist">
    <form action="" method="get">
        <label for="genre">Genre</label>
        <input type="text" class="genre" name="genre">
        <button type="submit" id="genreBtn">🔍</button>
    <p>and/or</p>
        <label for="artist">Artist</label>
        <input type="text" class="artist" name="artist">
        <button type="submit" id="artistBtn">🔍</button>
    <p>and/or</p>
        <label for="album">Album</label>
        <input type="text" class="album" name="album">
        <button type="submit" id="albumBtn">🔍</button>
    </form>
    </section>
</div>


//addEventListener
const genreButton = document.getElementById('genreBtn');
const artistButton = document.getElementById('artistBtn');
const albumButton = document.getElementById('albumBtn');


function handleClick() {
  console.log('search initiated....');
}


genreButton.addEventListener('click', handleClick);
artistButton.addEventListener('click', handleClick);
albumButton.addEventListener('click', handleClick);

{/* /////////////////////////////////////// */}
{/* Song list for playlist that have been created created */}




{/* ///////////////////////////////////// */}


<div>
    <h2>Recommendations</h2>
    <section id="searchResults">
        {/* <!-- Results will be rendered here --> */}
    </section>
</div>


<div>
    <h2>Selected Songs</h2>

    <ul id="selectedSongs">
        {/* <!-- Selected songs will be added here --> */}
    </ul>
</div>



{/* ///////////////////////////////// */}

