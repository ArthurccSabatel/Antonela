// JavaScript para efeito de máquina de escrever

// Função para efeito typewriter
function typeWriter(elemento, texto, velocidade = 50) {
    let i = 0;
    elemento.innerHTML = '';
    function type() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(type, velocidade);
        }
    }
    type();
}

// Função para iniciar efeito typewriter em elementos específicos
function iniciarTypewriter() {
    const elementos = document.querySelectorAll('.typewriter');
    elementos.forEach(elemento => {
        const texto = elemento.textContent;
        typeWriter(elemento, texto);
    });
}

// Inicializar typewriter quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    iniciarTypewriter();
});
