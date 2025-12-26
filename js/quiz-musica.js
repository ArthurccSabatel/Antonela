iniciar()

async function iniciar() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    adivinheAlbum();
}
 
function adivinheAlbum(artist = -1){
    var albuns;
    
    if(artist == -1)
        albuns = Artista.artistaLista[getRandom(Artista.artistaLista)].album;
    else   
        albuns = getArtistById(artist).album;

    let {album, musica} = getRandomMusic(albuns);

    musica.play()
    console.log(album, musica)
}

function getRandom(lista){
    return Math.floor(Math.random() * lista.length)
}

function getRandomMusic(albunslist){
    album = albunslist[getRandom(albunslist)]
    musica = album.musicas[getRandom(album.musicas)]

    return {album, musica}
}