
// ===== Cruzadinha de Arquitetura Computacional =====


// 1) PALAVRAS E PISTAS

const PALAVRAS = [
    { resposta: "CPU", linha: 0, coluna: 1, direcao: "V", pista: "Chip que executa as instruções dos programas; o cérebro do computador." },
    { resposta: "DMA", linha: 0, coluna: 9, direcao: "V", pista: "Recurso que deixa periféricos transferirem informações à memória sem ocupar a CPU." },
    { resposta: "MICROCONTROLADOR", linha: 0, coluna: 4, direcao: "V", pista: "Chip que reúne processador, memória e portas de entrada e saída, comum em sistemas embarcados." },
    { resposta: "RAM", linha: 1, coluna: 7, direcao: "H", pista: "Memória volátil principal onde ficam programas e dados em uso; perde tudo ao desligar." },
    { resposta: "REGISTRADORES", linha: 1, coluna: 7, direcao: "V", pista: "Pequenas posições de armazenamento dentro da CPU, as mais rápidas de todas." },
    { resposta: "QUADCORE", linha: 2, coluna: 0, direcao: "H", pista: "Processador com quatro núcleos de processamento no mesmo chip." },
    { resposta: "EEPROM", linha: 4, coluna: 9, direcao: "V", pista: "Memória não volátil regravável, que apaga e grava byte a byte; guarda pequenas configurações." },
    { resposta: "CACHE", linha: 5, coluna: 1, direcao: "V", pista: "Memória pequena e ultrarrápida entre CPU e RAM, que guarda o mais usado." },
    { resposta: "UC", linha: 7, coluna: 0, direcao: "H", pista: "Parte da CPU que coordena e dirige o que os outros blocos fazem." },
    { resposta: "ROM", linha: 7, coluna: 9, direcao: "H", pista: "Memória não volátil gravada de fábrica, cujo conteúdo normalmente não muda." },
    { resposta: "MEMORIADEMASSA", linha: 9, coluna: 0, direcao: "H", pista: "Guarda arquivos e programas por muito tempo e em grande volume, como HD e SSD." },
    { resposta: "DUALCORE", linha: 11, coluna: 1, direcao: "H", pista: "Processador com dois núcleos de processamento no mesmo chip." },
    { resposta: "FLASH", linha: 12, coluna: 13, direcao: "V", pista: "Memória não volátil regravável em blocos, usada em pen drives e cartões SD." },
    { resposta: "ADDRESSBUS", linha: 13, coluna: 2, direcao: "H", pista: "Via que leva da CPU a posição da memória que será lida ou escrita." },
    { resposta: "ULA", linha: 13, coluna: 10, direcao: "V", pista: "Parte da CPU que faz as contas e as operações lógicas." },
    { resposta: "DATABUS", linha: 15, coluna: 7, direcao: "H", pista: "Via por onde as informações trafegam entre CPU, memória e periféricos." }
];

const LINHAS = 17;
const COLUNAS = 14;


// 2) VARIÁVEIS

let grade = [];
let numeros = [];
let inputs = [];
let casas = [];
let resultado = [];
let palavraAtual = -1;
let casaAtual = null;

const elTabuleiro = document.getElementById("tabuleiro");
const elContador = document.getElementById("contador");
const elMensagem = document.getElementById("mensagem");
const elPistasH = document.getElementById("pistas-h");
const elPistasV = document.getElementById("pistas-v");
const elPistas = [];

document.getElementById("total").textContent = PALAVRAS.length;


// 3) POSIÇÃO DAS LETRAS

function posicao(p, i) {

    if (p.direcao === "H") {
        return {
            linha: p.linha,
            coluna: p.coluna + i
        };
    } else {
        return {
            linha: p.linha + i,
            coluna: p.coluna
        };
    }
}


// 4) VERIFICAR SE A CASA PERTENCE A UMA PALAVRA

function indiceNaPalavra(p, linha, coluna) {

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        if (pos.linha === linha && pos.coluna === coluna) {
            return i;
        }
    }

    return -1;
}


function palavrasDaCasa(linha, coluna) {

    let lista = [];

    for (let n = 0; n < PALAVRAS.length; n++) {

        if (indiceNaPalavra(PALAVRAS[n], linha, coluna) !== -1) {
            lista.push(n);
        }
    }

    return lista;
}


// 5) LER AS LETRAS DIGITADAS

function textoDigitado(p) {

    let texto = "";

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        texto = texto + inputs[pos.linha][pos.coluna].value;
    }

    return texto;
}


// 6) CRIAR A GRADE

for (let l = 0; l < LINHAS; l++) {

    grade[l] = [];
    numeros[l] = [];
    inputs[l] = [];
    casas[l] = [];

    for (let c = 0; c < COLUNAS; c++) {

        grade[l][c] = "";
        numeros[l][c] = 0;
    }
}


// Colocar as respostas na grade

for (let n = 0; n < PALAVRAS.length; n++) {

    let p = PALAVRAS[n];

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        grade[pos.linha][pos.coluna] = p.resposta[i];
    }

    resultado[n] = "";
}


// 7) NUMERAR AS PISTAS

let proximoNumero = 1;

for (let l = 0; l < LINHAS; l++) {

    for (let c = 0; c < COLUNAS; c++) {

        let encontrou = false;

        for (let n = 0; n < PALAVRAS.length; n++) {

            if (PALAVRAS[n].linha === l && PALAVRAS[n].coluna === c) {

                PALAVRAS[n].numero = proximoNumero;
                encontrou = true;
            }
        }

        if (encontrou === true) {

            numeros[l][c] = proximoNumero;
            proximoNumero++;
        }
    }
}


// 8) MOSTRAR O TABULEIRO

elTabuleiro.style.setProperty("--colunas", COLUNAS);
elTabuleiro.style.setProperty("--linhas", LINHAS);

for (let l = 0; l < LINHAS; l++) {

    for (let c = 0; c < COLUNAS; c++) {

        let div = document.createElement("div");

        casas[l][c] = div;

        if (grade[l][c] === "") {

            div.className = "casa vazia";

        } else {

            div.className = "casa";

            if (numeros[l][c] > 0) {

                let num = document.createElement("span");

                num.className = "num";
                num.textContent = numeros[l][c];

                div.appendChild(num);
            }

            let input = document.createElement("input");

            input.type = "text";
            input.autocomplete = "off";

            input.setAttribute("aria-label", "Linha " + (l + 1) + ", coluna " + (c + 1));

            input.addEventListener("click", function () {
                clicarNaCasa(l, c);
            });

            input.addEventListener("input", function () {
                digitar(l, c);
            });

            input.addEventListener("keydown", function (e) {
                apertarTecla(e, l, c);
            });

            div.appendChild(input);

            inputs[l][c] = input;
        }

        elTabuleiro.appendChild(div);
    }
}


// 9) ORGANIZAR AS PISTAS POR NÚMERO

let ordem = [];

for (let n = 0; n < PALAVRAS.length; n++) {
    ordem.push(n);
}

// Organizar os números das pistas
// Usando for no lugar de sort()

for (let i = 0; i < ordem.length; i++) {

    for (let j = 0; j < ordem.length - 1; j++) {

        if (PALAVRAS[ordem[j]].numero > PALAVRAS[ordem[j + 1]].numero) {

            let auxiliar = ordem[j];

            ordem[j] = ordem[j + 1];
            ordem[j + 1] = auxiliar;
        }
    }
}


// Mostrar as pistas na tela

for (let k = 0; k < ordem.length; k++) {

    let n = ordem[k];
    let p = PALAVRAS[n];

    let li = document.createElement("li");

    li.className = "pista";
    li.value = p.numero;

    li.innerHTML =
        '<button type="button">' +
        '<span class="n">' + p.numero + '</span>' +
        '<span class="t">' + p.pista + " (" + p.resposta.length + " letras)" + '</span>' +
        '<span class="sel"></span>' +
        "</button>";

    li.querySelector("button").addEventListener("click", function () {
        clicarNaPista(n);
    });

    if (p.direcao === "H") {
        elPistasH.appendChild(li);
    } else {
        elPistasV.appendChild(li);
    }

    elPistas[n] = li;
}


// 10) CLICAR EM UMA CASA

function clicarNaCasa(linha, coluna) {

    let candidatas = palavrasDaCasa(linha, coluna);

    let mesmaCasa = false;

    if (casaAtual !== null) {

        if (casaAtual.linha === linha && casaAtual.coluna === coluna) {
            mesmaCasa = true;
        }
    }

    if (mesmaCasa === true && candidatas.length === 2) {

        if (palavraAtual === candidatas[0]) {
            palavraAtual = candidatas[1];
        } else {
            palavraAtual = candidatas[0];
        }

    } else {

        let encontrou = false;

        for (let i = 0; i < candidatas.length; i++) {

            if (candidatas[i] === palavraAtual) {
                encontrou = true;
            }
        }

        if (encontrou === false) {
            palavraAtual = candidatas[0];
        }
    }

    casaAtual = {
        linha: linha,
        coluna: coluna
    };

    inputs[linha][coluna].select();

    destacar();
}


// 11) CLICAR EM UMA PISTA

function clicarNaPista(n) {

    palavraAtual = n;

    let p = PALAVRAS[n];
    let destino = posicao(p, 0);

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        if (inputs[pos.linha][pos.coluna].value === "") {

            destino = pos;
            break;
        }
    }

    casaAtual = destino;

    inputs[destino.linha][destino.coluna].focus();

    destacar();
}


// 12) DIGITAR UMA LETRA

function digitar(linha, coluna) {

    let campo = inputs[linha][coluna];

    let texto = campo.value.toUpperCase();

    if (texto.length > 0) {

        texto = texto.charAt(texto.length - 1);

        if (texto < "A" || texto > "Z") {
            texto = "";
        }
    }

    campo.value = texto;

    apagarMarcas(linha, coluna);

    let candidatas = palavrasDaCasa(linha, coluna);
    let encontrou = false;

    for (let i = 0; i < candidatas.length; i++) {

        if (candidatas[i] === palavraAtual) {
            encontrou = true;
        }
    }

    if (encontrou === false) {
        palavraAtual = candidatas[0];
    }

    casaAtual = {
        linha: linha,
        coluna: coluna
    };

    if (texto !== "") {
        irParaCasaDaPalavra(linha, coluna, 1);
    }

    destacar();
}


// 13) APERTAR TECLAS

function apertarTecla(e, linha, coluna) {

    if (e.key === "Backspace" && inputs[linha][coluna].value === "") {

        e.preventDefault();

        irParaCasaDaPalavra(linha, coluna, -1);
    }
}


// 14) IR PARA A PRÓXIMA OU ANTERIOR CASA

function irParaCasaDaPalavra(linha, coluna, passo) {

    if (palavraAtual === -1) {
        return;
    }

    let p = PALAVRAS[palavraAtual];

    let indice = indiceNaPalavra(p, linha, coluna);

    let novo = indice + passo;

    if (novo >= 0 && novo < p.resposta.length) {

        let pos = posicao(p, novo);

        casaAtual = pos;

        inputs[pos.linha][pos.coluna].focus();
        inputs[pos.linha][pos.coluna].select();
    }
}


// 15) CONFERIR AS RESPOSTAS

function conferir() {

    let acertos = 0;

    for (let n = 0; n < PALAVRAS.length; n++) {

        if (textoDigitado(PALAVRAS[n]) === PALAVRAS[n].resposta) {

            resultado[n] = "certa";
            acertos++;

        } else {

            resultado[n] = "errada";
        }
    }

    pintar();

    if (acertos === PALAVRAS.length) {

        elMensagem.textContent = "Parabéns! Você completou a cruzadinha!";
        elMensagem.className = "mensagem vitoria";

    } else {

        elMensagem.textContent = "Faltam " + (PALAVRAS.length - acertos) + " palavras. Veja nas pistas quais estão erradas (✗).";
        elMensagem.className = "mensagem";
    }
}


// 16) CONTAR OS ACERTOS

function contarAcertos() {

    let total = 0;

    for (let n = 0; n < PALAVRAS.length; n++) {

        if (resultado[n] === "certa") {
            total++;
        }
    }

    return total;
}


// 17) APAGAR MARCAS DE UMA PALAVRA

function apagarMarcas(linha, coluna) {

    let lista = palavrasDaCasa(linha, coluna);

    for (let k = 0; k < lista.length; k++) {

        resultado[lista[k]] = "";
    }

    elMensagem.textContent = "";

    pintar();
}


// 18) REINICIAR O JOGO

function reiniciar() {

    for (let l = 0; l < LINHAS; l++) {

        for (let c = 0; c < COLUNAS; c++) {

            if (inputs[l][c] !== undefined) {
                inputs[l][c].value = "";
            }
        }
    }

    for (let n = 0; n < PALAVRAS.length; n++) {
        resultado[n] = "";
    }

    elMensagem.textContent = "";
    elMensagem.className = "mensagem";

    palavraAtual = -1;
    casaAtual = null;

    pintar();
    destacar();
}


// 19) PINTAR ACERTOS E ERROS

function pintar() {

    for (let l = 0; l < LINHAS; l++) {

        for (let c = 0; c < COLUNAS; c++) {

            casas[l][c].classList.remove("certa");
            casas[l][c].classList.remove("errada");
        }
    }

    for (let n = 0; n < PALAVRAS.length; n++) {

        if (resultado[n] !== "") {

            let p = PALAVRAS[n];

            for (let i = 0; i < p.resposta.length; i++) {

                let pos = posicao(p, i);

                casas[pos.linha][pos.coluna].classList.remove("certa");
                casas[pos.linha][pos.coluna].classList.remove("errada");

                casas[pos.linha][pos.coluna].classList.add(resultado[n]);
            }
        }
    }

    // Atualizar as pistas

    for (let n = 0; n < PALAVRAS.length; n++) {

        let li = elPistas[n];

        li.classList.remove("certa");
        li.classList.remove("errada");

        let sinal = li.getElementsByClassName("sel")[0];

        if (resultado[n] === "certa") {

            li.classList.add("certa");
            sinal.textContent = "✓";

        } else if (resultado[n] === "errada") {

            li.classList.add("errada");
            sinal.textContent = "✗";

        } else {

            sinal.textContent = "";
        }
    }

    elContador.getElementsByTagName("strong")[0].textContent = contarAcertos();
}


// 20) DESTACAR A PALAVRA SELECIONADA

function destacar() {

    for (let l = 0; l < LINHAS; l++) {

        for (let c = 0; c < COLUNAS; c++) {

            casas[l][c].classList.remove("ativa");
            casas[l][c].classList.remove("foco");
        }
    }

    for (let n = 0; n < PALAVRAS.length; n++) {

        elPistas[n].classList.remove("ativa");
    }

    if (palavraAtual === -1) {
        return;
    }

    let p = PALAVRAS[palavraAtual];

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        casas[pos.linha][pos.coluna].classList.add("ativa");
    }

    if (casaAtual !== null) {

        casas[casaAtual.linha][casaAtual.coluna].classList.add("foco");
    }

    elPistas[palavraAtual].classList.add("ativa");
}


// 21) BOTÕES

document.getElementById("btn-conferir").addEventListener("click", conferir);

document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);


// INICIAR

pintar();
