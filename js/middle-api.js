const express = require('express');
const cors = require("cors")
const deezerUrl = 'https://api.deezer.com/'
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.json({status:true, message:'tudo certo aqui!'});
});

app.get('/api/artist/:artist', async (req, res) => {
    response = await fetch(`${deezerUrl}search/artist?q=${req.params.artist}&limit=1&output=json`)
    if(!response.ok)
        return res.json(response)

    const data = await response.json(); 
    res.json(data);
});

app.get('/api/albums/:artistId', async (req, res) => {
    response = await fetch(`${deezerUrl}/artist/${req.params.artistId}/albums`)
    if(!response.ok)
        return res.json(response)

    const data = await response.json(); 
    res.json(data);
});

app.get('/api/musicas/:id', async (req, res) => {
    response = await fetch(`${deezerUrl}album/${req.params.id}`)
    if(!response.ok)
        return res.json(response)

    const data = await response.json(); 
    res.json(data);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});