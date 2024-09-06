let opacidadeLogo = 1;
const bottomSend = document.querySelector('.Enviar');
let conversas = [];
let conversaInicialda = false;

// const mensagemBoasVindas = "Olá, sou Maind sua ia para doenças mentais, pode me responder algumas perguntas (Lembrando que eu não substituo um profissional)?";
// const mensagemIa = "Olá, tudo bem??";

function pegarTextoInput() {
    let conteudoMensagem = document.querySelector('.input-mensagem');
    texto = conteudoMensagem.value;
    return texto;
}

function apagarInput() {
    document.getElementById('Input-Mensagem').value = '';
}

function EnviarMsg() {
    let msg = pegarTextoInput();
    criarMensagemUsuario(msg);
    diminuirOpacidade();
    document.querySelector('.input-mensagem').focus();
}

document.getElementById('Input-Mensagem').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        EnviarMsg();
    }
});

bottomSend.addEventListener('click', () => {
    EnviarMsg();
});


// Add tag HTML
function criarMensagemUsuario(descricao) {
    // Criar um novo elemento
    var novoElemento = document.createElement("div");
    novoElemento.classList.add('Mensagem-usuario');
    novoElemento.innerHTML = `
        <div class="Mensagem-base">
            <div class="conteudo-mensagem"> ${descricao} </div>
        </div>
    `;

    // Selecionar o elemento pai onde o novo elemento será adicionado
    var elementoPai = document.getElementById("Conteudo");

    // Adicionar o novo elemento ao final do elemento pai
    elementoPai.appendChild(novoElemento);
    adicionarMensagem("Usuário", descricao);
    apagarInput();
}

// Função para adicionar um atraso
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função modificada para incluir um atraso de 3 segundos
async function criarMensagemIa(descricao) {
    // Criar um novo elemento
    var novoElemento = document.createElement("div");
    novoElemento.classList.add('Mensagem');
    novoElemento.innerHTML = `
        <div class="Mensagem-base Mensagem-ia">
            <div class="conteudo-mensagem">
                ${descricao}
            </div>
        </div>
    `;

    // Aguardar 3 segundos (3000 milissegundos)
    await sleep(1200);

    // Selecionar o elemento pai onde o novo elemento será adicionado
    var elementoPai = document.getElementById("Conteudo");

    // Adicionar o novo elemento ao final do elemento pai
    elementoPai.appendChild(novoElemento);
    adicionarMensagem("mAInd", descricao);
    conversaInicialda = true;
}


function diminuirOpacidade() {
    let elemento = document.getElementById('logo');
    document.getElementById('Conteudo').style.justifyContent = 'start';
    let intervalo = setInterval(function () {
        if (opacidadeLogo <= 0) {
            clearInterval(intervalo);
            elemento.remove();
        } else {
            opacidadeLogo -= 0.05;
            elemento.style.opacity = opacidadeLogo;
        }
    }, 50);

    // if (!conversaInicialda) {
    //     criarMensagemIa(mensagemBoasVindas);
    // }

}

function adicionarMensagem(remetente, mensagem) {
    let novaMensagem = {
        remetente: remetente,
        mensagem: mensagem,
        timestamp: new Date().toISOString()
    };
    conversas.push(novaMensagem);
    if (remetente.includes("Usuário")) {
        resposta(mensagem);
    }
    // window.scrollTo(0, document.body.scrollHeight);
    // Move a barra de rolagem para a última mensagem
    const chatContainer = document.getElementById('conversas-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
    console.log('Conversas:', conversas);
}

function resposta(respostaUsuario) {

    enviarResposta(respostaUsuario);

}

function enviarResposta(resposta) {

    fetch('https://reliable-youthfulness-production.up.railway.app/mAInd', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text_mensage: resposta
        }),
    })
        .then(response => response.json())
        .then(data => {
            criarMensagemIa(data.response_text);
            console.log('data', data);
        })
        .catch(error => console.error('Error:', error));
}



