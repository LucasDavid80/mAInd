document.addEventListener('DOMContentLoaded', function () {
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;

            // Adicionar o event listener ao ícone do menu após o menu ser carregado
            const iconMenu = document.querySelector('.Icone-menu');
            iconMenu.addEventListener('click', () => {
                if (!botaoMenu) {
                    // Esconder o Menu
                    textoLinks = esconderMenu(textoLinks);
                } else {
                    // Mostrar Menu
                    mostrarMenu();
                }
            });
            window.onload = alterarSrcImagemComBaseNoTitulo();
        });
});

let botaoMenu = false;
const textoLinks = ['Chat', 'Ansiedade', 'Depressão', 'Estresse', 'Solidão', 'Help', 'Settings'];

// window.onload = alterarSrcImagemComBaseNoTitulo;

function mostrarMenu() {
    botaoMenu = false;
    const iconMenu = document.querySelector('.Icone-menu');
    iconMenu.classList.add('ativo');

    // Voltar os textos do menu
    textoLinks.forEach((texto) => {
        addElementos(texto);
    });

    const bottomMenu = document.querySelectorAll('.bottom-menu');
    bottomMenu.forEach((elemento) => {
        elemento.style.justifyContent = 'start';
    });
}

function esconderMenu(textoLinks) {
    botaoMenu = true;
    const iconMenu = document.querySelector('.Icone-menu');
    iconMenu.classList.remove('ativo');

    const textMenu = document.querySelectorAll('.text-menu');
    textMenu.forEach((texto) => {
        texto.setAttribute('data-original-text', texto.textContent);
        if (textoLinks.length < 7) {
            textoLinks.push(texto.textContent);
        }
        removeElementos(texto.textContent);
        texto.style.textAlign = "center";
    });

    const bottomMenu = document.querySelectorAll('.bottom-menu');
    bottomMenu.forEach((elemento) => {
        elemento.style.justifyContent = 'center';
    });
    return textoLinks;
}

function removeElementos() {
    var elementos = document.getElementsByClassName('text-menu');
    elementos[elementos.length - 1].remove();
}

function addElementos(descricao) {
    var novoElemento = document.createElement("div");
    novoElemento.classList.add('text-menu');
    novoElemento.innerHTML = `${descricao}`;
    var elementoPai = document.getElementById(descricao);
    elementoPai.appendChild(novoElemento);
}

function alterarSrcImagemComBaseNoTitulo() {
    const url = window.location.href;
    const partes = url.replace('.html', '').split('/');
    const novoSrc = `../src/icons/${partes[partes.length - 1]}-ativo.svg`;

    const icons = document.querySelectorAll('.icon-img');
    icons.forEach((icon) => {
        if (icon.src.includes(partes[partes.length - 1])) {
            icon.src = novoSrc;
        }
    });
}
