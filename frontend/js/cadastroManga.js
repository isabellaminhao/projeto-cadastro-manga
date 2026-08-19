const API_URL = "http://localhost:8080/api/mangas";

const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

const titulo = document.getElementById("titulo");
const demografia = document.getElementById("demografia");
const volumeAtual = document.getElementById("volumeAtual");
const notaPessoal = document.getElementById("notaPessoal");
const avisoNota = document.getElementById("avisoNota");


demografia.addEventListener("change", function () {

    if (demografia.value === "Seinen") {
        avisoNota.textContent =
            "Para mangás Seinen, a nota mínima é 5.";
    } else {
        avisoNota.textContent =
            "Dê uma nota de 0 a 10.";
    }

});


formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nomeManga = titulo.value.trim();
    const volume = Number(volumeAtual.value);
    const nota = Number(notaPessoal.value);
    const demografiaValor = demografia.value;

    if (nomeManga === "") {
        mostrarMensagem(
            "Informe o título do mangá.",
            "erro"
        );
        return;
    }

    if (demografiaValor === "") {
        mostrarMensagem(
            "Selecione uma demografia.",
            "erro"
        );
        return;
    }

    if (volume <= 0 || isNaN(volume)) {
        mostrarMensagem(
            "O volume deve ser maior que zero.",
            "erro"
        );
        return;
    }

    if (nota < 0 || nota > 10 || isNaN(nota)) {
        mostrarMensagem(
            "A nota deve estar entre 0 e 10.",
            "erro"
        );
        return;
    }

    if (demografiaValor === "Seinen" && nota < 5) {
        mostrarMensagem(
            "Mangás Seinen devem possuir nota igual ou superior a 5.",
            "erro"
        );
        return;
    }


    const manga = {
        nomeManga: nomeManga,
        volume: volume,
        nota: nota,
        demografia: demografiaValor
    };


    try {

        const resposta = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(manga)
        });


        if (resposta.ok) {

            const novoManga = await resposta.json();

            mostrarMensagem(
                "Mangá cadastrado com sucesso! ❤️",
                "sucesso"
            );

            formulario.reset();

            setTimeout(function () {
                window.location.href = "/pages/perfil.html";
            }, 1500);

        } else {

            const erro = await resposta.text();

            if (resposta.status === 500) {

                mostrarMensagem(
                    "Esse mangá já está cadastrado.",
                    "erro"
                );

            } else {

                mostrarMensagem(
                    "Não foi possível cadastrar o mangá.",
                    "erro"
                );
            }

            console.error("Erro:", erro);
        }

    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "Não foi possível conectar ao servidor.",
            "erro"
        );
    }

});


function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = "mensagem " + tipo;

}