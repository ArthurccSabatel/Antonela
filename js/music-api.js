const urlApi = "https://api.deezer.com/"


getAlbums('eminem')

class album {
    id;
    nome;
    cover;
    genero;
    lancamento;
    musicas = []

    constructor(id, nome, cover, genero, lancamento) {
        this.id = id;
        this.nome = nome;
        this.cover = cover;
        this.genero = genero;
        this.lancamento = lancamento;
    }

    addMusica(musica){
        this.musicas.push(musica)
    }
}

class Musica {
    album;
    nome;
    link;

    constructor(album,nome,link){
        this.album = album;
        this.nome = nome;
        this.link = link
        album.addMusica(this)
    }

    play(){
        // sla como da play.
    }
}



async function getAlbums(artist) {
    response = await fetch(`${urlApi}search?q=${artist}&output=json`)

    if(!response.ok)
        return console.log("not ok")

    response = await response.json()

    response.data.forEach(async album => {
        albumResponse = await fetch(album.tracklist)

    });
}






