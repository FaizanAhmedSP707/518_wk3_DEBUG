async function addNewSong() {
    try {
        const songOBJ = {
            title: document.getElementById('titleOfSong').value,
            artist: document.getElementById('artistOfSong').value,
            year: document.getElementById('yearOfSong').value,
            downloads: document.getElementById('numDownloadOfSong').value,
            price: document.getElementById('priceOfSong').value,
            quantity: document.getElementById('quantityOfSong').value
        }
        
        const response = await fetch('/song/addnewSong', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(songOBJ) //What do I here ---> Just add the line JSON.stringify( <object_name> ) that you want to include
        });
        if(response.status == 400) {
            alert("There was an error in adding a new song. Looks like you didn't complete some of the fields needed.");
        }
    } catch (e) {
        alert(`There was an error in adding a new song: ${e}`);
    }
}

//button listener
document.getElementById('addSongBtn').addEventListener('click', ()=> {
    //What do I add/do here?? ---> Just call the function above!
    addNewSong()
});
