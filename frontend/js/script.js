const imagens = [
    "img/junjiIto.webp",
    "img/attackontitan.png",
    "img/chaisawMan.jpeg",
    "img/naruto.jpg"
];

let indice = 0;
const imagem =
    document.getElementById("imagemManga");
const anterior =
    document.getElementById("anterior");
const proximo =
    document.getElementById("proximo");
const indicadores =
    document.querySelectorAll(".indicador");


function mostrarImagem(numero) {
    indice = numero;
    if (indice < 0) {
        indice = imagens.length - 1;
    }

    if (indice >= imagens.length) {
        indice = 0;
    }

    imagem.style.opacity = "0";
    setTimeout(function () {
        imagem.src = imagens[indice];
        imagem.style.opacity = "1";
    }, 200);


    indicadores.forEach(function (indicador, i) {
        indicador.classList.toggle(
            "ativo",
            i === indice
        );
    });
}


proximo.addEventListener(
    "click",
    function () {
        mostrarImagem(indice + 1);
    }
);


anterior.addEventListener(
    "click",
    function () {
        mostrarImagem(indice - 1);
    }
);


indicadores.forEach(function (indicador, i) {
    indicador.addEventListener(
        "click",
        function () {
            mostrarImagem(i);
        }
    );
});

setInterval(function () {
    mostrarImagem(indice + 1);
}, 4000);