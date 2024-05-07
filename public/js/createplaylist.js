
<div>
    <h2>Create Playlist</h2>

    <section class="createPlaylist">
    <form action="#" method="get">
        <label for="genre">Genre</label>
        <input type="text" class="genre" name="genre">
        <button type="submit" id="genreBtn">🔍</button><br><br>
    
        <label for="artist">Artist</label>
        <input type="text" class="artist" name="artist">
        <button type="submit" id="artistBtn">🔍</button><br><br>
    
        <label for="album">Album</label>
        <input type="text" class="album" name="album">
        <button type="submit" id="albumBtn">🔍</button><br><br>
    </form>
    </section>

</div>


// Step 1: Identify the Event
const genreButton = document.getElementById('genreBtn');
const artistButton = document.getElementById('artistBtn');
const albumButton = document.getElementById('albumBtn');

// Step 3: Write the Event Listener Function
function handleClick() {
  console.log('Button clicked!');
}

// Step 4: Attach the Event Listener
genreButton.addEventListener('click', handleClick);
artistButton.addEventListener('click', handleClick);
albumButton.addEventListener('click', handleClick);