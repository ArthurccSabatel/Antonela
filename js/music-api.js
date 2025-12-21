const urlApi = "https://api.deezer.com/"

iniciar()

async function iniciar() {
    ta = await loadArtist('Adoravel Cliche')
    loadMusicas(ta.id)
    
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
    genero;
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

    static addMusica(musicainfos, musica, albumId){
         let albuma = Album.albumLista.find(a => a.id == albumId)
        if(!albuma) //cria um album novo
        {
            const asd = new this(albumId, musicainfos.artist.id, musicainfos.album.title, musicainfos.album.cover)
            asd.musicas.push(musica)
            return true;
        }

        albuma.musicas.push(musica)
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

async function loadMusicas(artistId) {
    response = await fetch(`${urlApi}artist/${artistId}/top?&limit=100&output=json`)
    if(!response.ok)
        return console.log("not ok")

    response = await response.json()   
    data = response.data

    data.forEach(musica => {
        novaMusica = new Musica(musica.title, musica.link)
        Album.addMusica(musica, novaMusica,  musica.album.id)
        novaMusica.album = musica.album.title;
    });

    Album.listar()
}   






