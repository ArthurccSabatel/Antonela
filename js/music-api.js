const urlApi = "http://localhost:3000/"

iniciar()

async function iniciar() {
    ta = await loadArtist('Pelados')
    await loadAlbums(ta.id)

    // await new Promise(resolve => setTimeout(resolve, 2000))
    // Album.listar()
}


class Artista {
    static artistaLista = []
    id;
    nome;
    foto;
    album = [];

    constructor(id, nome, foto){
        this.id = id;
        this.nome = nome
        this.foto = foto;
        Artista.artistaLista.push(this);
        return this;
    }

    static addAlbum(artistId, artist){ 
        artistId = Artista.artistaLista.find(a => a.id == artistId)
        if(!artistId)
            return console.log(`Artista com id ${artistId} nao encontrado ao adicionar album`)
        artistId.album.push(artist)
    }
}


class Album {
    static albumLista = [];

    id;
    artista;
    nome;
    cover;
    lancamento;
    genero = [];
    musicas = [];

    constructor(id, artista, nome, cover) {
        this.id = id;
        this.artista = artista;
        this.nome = nome;
        this.cover = cover;

        Album.albumLista.push(this);
        Artista.addAlbum(this.artista, this);
        return this;
    }

    addMusica(musica){
        this.musicas.push(musica)
    }
    
    completarInfo(generos, cover, lancamento){
        this.cover = cover;
        this.genero = generos.map(genero => genero.name);
        this.lancamento = lancamento;
    }

    static listar(){
        Album.albumLista.forEach(album => {
            console.log(album)
        });
    }
}

class Musica {
    id;
    album;
    nome;
    preview;

    constructor(id, nome, preview ){
        this.id = id
        this.nome = nome;
        this.preview = preview
    }


    play() {
        const player = document.getElementById("player");
        player.src = this.preview;
   }
}



async function loadArtist(artist) {
    response = await fetch(`${urlApi}api/artist/${artist}`)

    if(!response.ok)
        return console.log("not ok 1")

    response = await response.json()
    response = response.data[0]; 

    artistanovo = new Artista(response.id, response.name, response.picture)
    return artistanovo;
}

async function loadAlbums(artistId) {
    response = await fetch(`${urlApi}api/albums/${artistId}`)

    if(!response.ok)
        return console.log(response)

    response = await response.json()
 
    instanciaArtista = Artista.artistaLista.find(a => a.id == artistId)
    if(!instanciaArtista)
        return console.log(`Artista com id ${instanciaArtista} nao encontrado ao adicionar album`)

    response.data.forEach(album => {
        albumNovo = new Album(album.id, instanciaArtista.id, album.title, album.picture)
        // console.log(`>>>> Album Adicionado: ${albumNovo.nome}`)
        loadMusicas(album.id)
    });
}


async function loadMusicas(albumId) {
    response = await fetch(`${urlApi}api/musicas/${albumId}`)

    if(!response.ok)
        return console.log(response)

    response = await response.json()   
    data = response.tracks.data

    let album = getAlbumById(albumId)
    
    if(album)
    {
        if(!album.cover) album.completarInfo(response.genres.data, response.cover, response.release_date)
        
        data.forEach(musica => {
            novaMusica = new Musica(musica.id, musica.title, musica.preview)
            novaMusica.album = musica.album.title;
            album.addMusica(novaMusica)
            // console.log(`>>>> Musica Adicionada: ${musica.title}`)
        });
    }
    else 
        console.log("ERRO - Ao localizar album")
}   


function getAlbumById(albumId)
{
    instAlbum = Album.albumLista.find(a => a.id == albumId)
    if(!instAlbum)
        return false;
    return instAlbum;
}

function getArtistById(artistId)
{
    instArtista = Artista.artistaLista.find(a => a.id == artistId)
    if(!instArtista)
        return false;
    return instArtista;
}