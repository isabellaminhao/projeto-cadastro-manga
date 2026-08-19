const API_URL = "http://localhost:8080/api/mangas";

const listaMangas = document.getElementById("listaMangas");
const semMangas = document.getElementById("semMangas");

async function carregarMangas() {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar os mangás.");
        }

        const mangas = await resposta.json();

        mostrarMangas(mangas);

    } catch (erro) {

        console.error(erro);

        listaMangas.innerHTML = `
            <p>
                Não foi possível carregar sua coleção.
            </p>
        `;

    }

}


function mostrarMangas(mangas) {

    listaMangas.innerHTML = "";

    if (mangas.length === 0) {

        semMangas.style.display = "block";

        return;
    }

    semMangas.style.display = "none";


    mangas.forEach(function (manga) {

        const card = document.createElement("div");

        card.classList.add("manga-card");


        card.innerHTML = `

            <div class="manga-volume">

                <strong>
                    ${manga.volume}
                </strong>

                <span>
                    vol.
                </span>

            </div>


            <div class="manga-nota">

                <strong>
                    ${manga.nota}
                </strong>

                <span>
                    /10
                </span>

            </div>


            <div class="manga-info">

                <span class="manga-demografia">
                    ${manga.demografia}
                </span>


                <h3 title="${manga.nomeManga}">
                    ${manga.nomeManga}
                </h3>


                <p>
                    Volume: ${manga.volume}
                </p>


                <p>
                    Minha nota: ${manga.nota}/10
                </p>

            </div>


            <div class="manga-acoes">

                <button
                    class="btn-atualizar"
                    onclick="atualizarManga(${manga.id})"
                >
                    Atualizar
                </button>


                <button
                    class="btn-excluir"
                    onclick="excluirManga(${manga.id})"
                >
                    Excluir
                </button>

            </div>

        `;


        listaMangas.appendChild(card);

    });

}


async function atualizarManga(id) {

    try {

        const respostaBusca = await fetch(
            `${API_URL}/${id}`
        );

        if (!respostaBusca.ok) {
            throw new Error(
                "Não foi possível encontrar o mangá."
            );
        }

        const manga = await respostaBusca.json();


        const novoNome = prompt(
            "Nome do mangá:",
            manga.nomeManga
        );

        if (novoNome === null) {
            return;
        }


        const novoVolume = prompt(
            "Volume:",
            manga.volume
        );

        if (novoVolume === null) {
            return;
        }


        const novaNota = prompt(
            "Sua nota (0 a 10):",
            manga.nota
        );

        if (novaNota === null) {
            return;
        }


        const novaDemografia = prompt(
            "Demografia:",
            manga.demografia
        );

        if (novaDemografia === null) {
            return;
        }



        if (novoNome.trim() === "") {

            alert(
                "O nome do mangá não pode ficar vazio."
            );

            return;
        }


        if (novoVolume.trim() === "") {

            alert(
                "Informe o volume."
            );

            return;
        }


        if (
            Number(novaNota) < 0 ||
            Number(novaNota) > 10 ||
            isNaN(Number(novaNota))
        ) {

            alert(
                "A nota deve estar entre 0 e 10."
            );

            return;
        }
        const mangaAtualizado = {

            nomeManga: novoNome.trim(),

            volume: Number(novoVolume),

            nota: Number(novaNota),

            demografia: novaDemografia.trim()

        };

        const resposta = await fetch(
            `${API_URL}/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(mangaAtualizado)
            }
        );


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível atualizar o mangá."
            );

        }


        alert(
            "Mangá atualizado com sucesso!"
        );


        carregarMangas();

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao atualizar o mangá."
        );

    }

}

async function excluirManga(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este mangá?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const resposta = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível excluir o mangá."
            );

        }


        alert(
            "Mangá excluído com sucesso!"
        );


        carregarMangas();

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao excluir o mangá."
        );

    }

}

carregarMangas();
