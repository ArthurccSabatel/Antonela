iniciar()

async function iniciar() {
    await new Promise(resolve => setTimeout(resolve, 1000))
    adivinheAlbum();
}
 
function adivinheAlbum(artist = -1){
    var albuns;
    
    if(artist == -1){
        albuns = Artista.artistaLista[Math.floor(Math.random() * Artista.artistaLista.length)].album;
    }
    else{
        albuns = .album;


    }

    console.log(albuns);

}