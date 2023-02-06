console.log("Hello World from JavaScript!");

//console.log(`Artist name seached is: ${artistName}`);

//These functions work in the background and work on the principle of promises
async function artistAJAXsearch(artist) {
    try {
        const response = await fetch(`http://localhost:3000/songs/searchartist/${artist}`);

        //parse the JSON from the response
        const songs = await response.json();

        //Loop through the array of song objects and add the results to the div in the page
        let html_result = "";
        songs.forEach( song => {
            html_result += `
            Title: ${song.title},
            Artist: ${song.artist},
            Year: ${song.year},
            Downloads: ${song.downloads},
            Price: ${song.price},
            Quantity: ${song.quantity}
            <br>
            `
        });
        document.getElementById('artist_search_result').innerHTML = html_result;
    } catch (e) {
        alert(`There was an error: ${e}`);
    }
}

//Make this AJAX function run when we click the button
document.getElementById('search').addEventListener('click', ()=> {
    //read the artist name from the relevant text field
    const artistName = document.getElementById('artist').value;
    artistAJAXsearch(artistName);
});
