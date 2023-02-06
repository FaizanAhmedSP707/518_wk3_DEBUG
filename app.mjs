import express from 'express'
import Database from 'better-sqlite3'

const app = express();
const db = new Database("C:\\Users\\AhmedWK\\Desktop\\SSU_BSc_SE_2021-2024\\COM518\\Week__3\\wadsongs.db");

app.use(express.static('public'));
app.use(express.json());

/*
app.get('/', (req, res) => {
    res.send("Song searching from a database main page!");
});
*/

//Question 2.1 : Searching for all songs by a particular artist
app.get('/songs/searchartist/:artistName', (req, res) => {
    try {
        const Stmnt = db.prepare("SELECT * FROM wadsongs WHERE artist=?")
        const results = Stmnt.all(req.params.artistName);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error}); // --> ASK ABOUT THIS WHETHER THIS ERROR CODE IS OK OR DO I USE 404
    }
});

//Question 2.2 : Searching for all songs with a given title
app.get('/songs/searchtitle/:titleName', (req, res) => {
    try {
        const stmnt = db.prepare("SELECT * FROM wadsongs WHERE title=?");
        const resultSet = stmnt.all(req.params.titleName);
        res.json(resultSet);
    } catch (error) {
        res.status(500).json({ error: error })  // SAME HERE!
    }
});

//Question 2.3 : Searching for all songs by a particular artist with MATCHING title
app.get("/songs/searchby/:nameOfArtist/and/:songTitleName", (req, res) => {
    try {
        const stmnt = db.prepare("SELECT * FROM wadsongs WHERE artist=? AND title=?");
        const results = stmnt.all(req.params.nameOfArtist, req.params.songTitleName);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error });  // AS IS THIS ONE!
    }
});

//Question 2.4 : Searching for a song with a given ID
app.get("/songs/searchbyID/:searchid", (req, res) => {
    try {
        const stmnt = db.prepare("SELECT * FROM wadsongs WHERE id=?");
        const results = stmnt.all(req.params.searchid);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

//Question 2.5 : Buy a physical copy of the song (use a POST request)
app.post("/songs/purchaseSong/:idofSong", (req, res) => {
    try {
        const stmnt = db.prepare("UPDATE wadsongs SET quantity=quantity-1 WHERE id=?");
        /*
        This variable stores certain return data from an update statement, such as the row id of the last
        entered record, as well as the number of rows updated, this is used to validate whether the operation
        was successful or not
        */
        const info = stmnt.run(req.params.idofSong);

        if(info.changes == 1) {
            res.json({success: 1});
        } else {
            res.status(404).json({error: 'No product with that ID.'});
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Question 2.6 : Delete a song with a given ID (use a DELETE request)
app.delete("/songs/removeSongByID/:songID", (req, res) => {
    try {
        const stmnt = db.prepare("DELETE FROM wadsongs WHERE id=?");
        const info = stmnt.run(req.params.songID);
        
        if(info.changes == 1) {
            res.json({success: 1});
        } else {
            res.status(404).json({error: 'No product with that ID.'});
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

//Question 2.7: add a new song by specifying all columns in a database, except for the id field
app.post("/song/addnewSong", (req, res) => {
    if(req.body.title == "" || req.body.artist == "" || req.body.year == "" ||
    req.body.downloads == "" || req.body.price == "" || req.body.quantity == "") {
            res.status(400);
    } else {
        try {
            const stmnt = db.prepare
            ('INSERT INTO wadsongs(title, artist, year, downloads, price, quantity) VALUES(?,?,?,?,?,?)');
            const info = stmnt.run
            (req.body.title, req.body.artist, req.body.year, req.body.downloads, req.body.price, req.body.quantity);
            res.json({id: info.lastInsertRowid});
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
});

app.get("/user/queryArtist", (req, res) => {
    const searchVal = req.params.query_artist;
});

app.listen(3000);
