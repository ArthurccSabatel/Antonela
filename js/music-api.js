const urlApi = "https://api.deezer.com/"

iniciar()

async function iniciar() {
    ta = await loadArtist('Pelados')
    await loadAlbums(ta.id)

    await new Promise(resolve => setTimeout(resolve, 2000))
    Album.listar()
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
    static albumLista = []

    id;
    artista;
    nome;
    cover;
    genero = [];
    lancamento;
    musicas = []

    constructor(id, artista, nome, cover) {
        this.id = id;
        this.artista = artista;
        this.nome = nome;
        this.cover = cover;
        this.musicas = [];
        Album.albumLista.push(this);
        Artista.addAlbum(this.artista, this);
        return this;
    }

    addMusica(musica){
        this.musicas.push(musica)
    }
    
    completarInfo(generos, cover, lancamento){
        this.cover = cover
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
    album;
    nome;
    link;

    constructor(nome,link){
        this.nome = nome;
        this.link = link
    }

    play(){
        // sla como da play.
    }
}



async function loadArtist(artist) {
    response = await fetch(`${urlApi}search/artist?q=${artist}&limit=1&output=json`)

    if(!response.ok)
        return console.log("not ok")

    response = await response.json()
    response = response.data[0]    

    artistanovo = new Artista(response.id, response.name, response.picture)
    return artistanovo;
}

async function loadAlbums(artistId) {
    response = await fetch(`${urlApi}/artist/${artistId}/albums`)

    if(!response.ok)
        return console.log("not ok")

    response = await response.json()
 
    instanciaArtista = Artista.artistaLista.find(a => a.id == artistId)
    if(!instanciaArtista)
        return console.log(`Artista com id ${instanciaArtista} nao encontrado ao adicionar album`)

    await response.data.forEach(album => {
        albumNovo = new Album(album.id, instanciaArtista.id, album.title, album.picture)
        console.log(`>>>> Album Adicionado: ${albumNovo.nome}`)
        loadMusicas(album.id)
    });
}




async function loadMusicas(albumId) {
    response = await fetch(`${urlApi}album/${albumId}`)

     if(!response.ok)
        return console.log("not ok")


    response = await response.json()   

    data = response.tracks.data

    let album = getAlbumById(albumId)
    
    if(album)
    {
        if(!album.cover) album.completarInfo(response.genres.data, response.cover, response.release_date)
        await data.forEach(musica => {
            novaMusica = new Musica(musica.title, musica.link)
            novaMusica.album = musica.album.title;
            album.addMusica(novaMusica)
            console.log(`>>>> Musica Adicionada: ${musica.title}`)
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