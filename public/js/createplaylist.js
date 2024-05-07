



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

