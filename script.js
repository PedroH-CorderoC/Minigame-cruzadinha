// ===== Cruzadinha de Arquitetura Computacional =====
// Com modos Fácil, Médio e Difícil


// 1) PALAVRAS E PISTAS

const PALAVRAS = [
    { resposta: "CPU", linha: 0, coluna: 1, direcao: "V", pista: "Chip que executa as instruções dos programas; o cérebro do computador.", curiosidade: "A primeira CPU em um único chip foi o Intel 4004, lançado em 1971." },
    { resposta: "DMA", linha: 0, coluna: 9, direcao: "V", pista: "Recurso que deixa periféricos transferirem informações à memória sem ocupar a CPU.", curiosidade: "Com DMA, um disco pode copiar dados direto para a RAM enquanto a CPU faz outra tarefa." },
    { resposta: "MICROCONTROLADOR", linha: 0, coluna: 4, direcao: "V", pista: "Chip que reúne processador, memória e portas de entrada e saída, comum em sistemas embarcados.", curiosidade: "O Arduino Uno usa o microcontrolador ATmega328P, com apenas 2 KB de RAM." },
    { resposta: "RAM", linha: 1, coluna: 7, direcao: "H", pista: "Memória volátil principal onde ficam programas e dados em uso; perde tudo ao desligar.", curiosidade: "RAM vem de Random Access Memory: qualquer posição é acessada no mesmo tempo, sem ler em sequência." },
    { resposta: "REGISTRADORES", linha: 1, coluna: 7, direcao: "V", pista: "Pequenas posições de armazenamento dentro da CPU, as mais rápidas de todas.", curiosidade: "Registradores são o nível mais rápido da hierarquia de memória, mas há só algumas dezenas deles na CPU." },
    { resposta: "QUADCORE", linha: 2, coluna: 0, direcao: "H", pista: "Processador com quatro núcleos de processamento no mesmo chip.", curiosidade: "Quatro núcleos só ajudam de verdade quando o programa consegue dividir o trabalho em tarefas paralelas." },
    { resposta: "EEPROM", linha: 4, coluna: 9, direcao: "V", pista: "Memória não volátil regravável, que apaga e grava byte a byte; guarda pequenas configurações.", curiosidade: "EEPROM significa Electrically Erasable Programmable Read-Only Memory e aceita um número limitado de regravações." },
    { resposta: "CACHE", linha: 5, coluna: 1, direcao: "V", pista: "Memória pequena e ultrarrápida entre CPU e RAM, que guarda o mais usado.", curiosidade: "Quando o dado está na cache é um hit; quando não está, é um miss e a CPU precisa buscar na RAM." },
    { resposta: "UC", linha: 7, coluna: 0, direcao: "H", pista: "Parte da CPU que coordena e dirige o que os outros blocos fazem.", curiosidade: "A UC controla o ciclo busca, decodifica e executa de cada instrução." },
    { resposta: "ROM", linha: 7, coluna: 9, direcao: "H", pista: "Memória não volátil gravada de fábrica, cujo conteúdo normalmente não muda.", curiosidade: "O firmware que ensina um equipamento a ligar costuma ficar em memória do tipo ROM." },
    { resposta: "MEMORIADEMASSA", linha: 9, coluna: 0, direcao: "H", pista: "Guarda arquivos e programas por muito tempo e em grande volume, como HD e SSD.", curiosidade: "O SSD não tem partes móveis; o HD grava os dados em discos magnéticos giratórios." },
    { resposta: "DUALCORE", linha: 11, coluna: 1, direcao: "H", pista: "Processador com dois núcleos de processamento no mesmo chip.", curiosidade: "Com dois núcleos, duas tarefas podem rodar realmente ao mesmo tempo, e não só se alternando." },
    { resposta: "FLASH", linha: 12, coluna: 13, direcao: "V", pista: "Memória não volátil regravável em blocos, usada em pen drives e cartões SD.", curiosidade: "A memória flash foi inventada por Fujio Masuoka, na Toshiba, na década de 1980." },
    { resposta: "ADDRESSBUS", linha: 13, coluna: 2, direcao: "H", pista: "Via que leva da CPU a posição da memória que será lida ou escrita.", curiosidade: "Um barramento de endereços de 32 bits consegue endereçar até 4 GB de memória." },
    { resposta: "ULA", linha: 13, coluna: 10, direcao: "V", pista: "Parte da CPU que faz as contas e as operações lógicas.", curiosidade: "ULA é Unidade Lógica e Aritmética; em inglês, ALU." },
    { resposta: "DATABUS", linha: 15, coluna: 7, direcao: "H", pista: "Via por onde as informações trafegam entre CPU, memória e periféricos.", curiosidade: "Diferente do barramento de endereços, o de dados é bidirecional: a informação vai e volta." }
];

const LINHAS = 17;
const COLUNAS = 14;


// 2) MODOS DE JOGO

const MODOS = {
    facil: {
        nome: "Fácil",
        resumo: "primeira letra de cada palavra já vem preenchida, 5 dicas e correção automática.",
        primeiraLetra: true,
        dicas: 5,
        tempoLimite: 0,          // 0 = sem limite (cronômetro sobe)
        bonusTempo: 0,           // segundos ganhos a cada palavra certa
        autoConferir: "todas",   // "todas" = marca certas e erradas sozinho
        mostrarTamanho: true,
        multiplicador: 1,
        penalidadeDica: 5,
        penalidadeErro: 0,
        penalidadeRevelar: 30,
        penalidadeTempoDica: 0,
        penalidadeTempoErro: 0,
        penalidadeTempoRevelar: 0
    },
    medio: {
        nome: "Médio",
        resumo: "3 dicas, acertos aparecem sozinhos e erros só aparecem ao clicar em Conferir.",
        primeiraLetra: false,
        dicas: 3,
        tempoLimite: 0,
        bonusTempo: 0,
        autoConferir: "certas",  // "certas" = só marca as certas sozinho
        mostrarTamanho: true,
        multiplicador: 1.5,
        penalidadeDica: 15,
        penalidadeErro: 10,
        penalidadeRevelar: 60,
        penalidadeTempoDica: 0,
        penalidadeTempoErro: 0,
        penalidadeTempoRevelar: 0
    },
    dificil: {
        nome: "Difícil",
        resumo: "15 minutos no relógio (+20 s por palavra certa), 1 dica e nada de correção automática.",
        primeiraLetra: false,
        dicas: 1,
        tempoLimite: 900,
        bonusTempo: 20,
        autoConferir: "nenhuma", // só marca ao clicar em Conferir
        mostrarTamanho: false,
        multiplicador: 2,
        penalidadeDica: 30,
        penalidadeErro: 20,
        penalidadeRevelar: 90,
        penalidadeTempoDica: 20,
        penalidadeTempoErro: 15,
        penalidadeTempoRevelar: 60
    }
};


// 3) VARIÁVEIS

let grade = [];
let numeros = [];
let inputs = [];
let casas = [];
let travadas = [];      // "", "dada" (letra inicial) ou "dica" (letra revelada)
let resultado = [];
let pontuada = [];      // true se a palavra já deu pontos (evita ganhar duas vezes)
let ultimoErro = [];    // último texto errado já penalizado em cada palavra
let palavraAtual = -1;
let casaAtual = null;

let modo = null;
let config = null;
let jogoAtivo = false;
let intervalo = null;

let pontos = 0;
let combo = 0;
let melhorCombo = 0;
let dicasRestantes = 0;
let dicasUsadas = 0;
let reveladas = 0;
let erros = 0;
let decorrido = 0;
let restante = 0;
let ultimoResultado = "";

let mudo = false;
let audioCtx = null;
let ultimoSom = 0;

let revelarConfirmando = -1;   // palavra que está esperando a confirmação do Revelar
let timerConfirmar = null;

const elTabuleiro = document.getElementById("tabuleiro");
const elContador = document.getElementById("contador");
const elMensagem = document.getElementById("mensagem");
const elFato = document.getElementById("fato");
const elPistasH = document.getElementById("pistas-h");
const elPistasV = document.getElementById("pistas-v");
const elTempo = document.getElementById("tempo");
const elRotuloTempo = document.getElementById("rotulo-tempo");
const elPontos = document.getElementById("pontos");
const elCombo = document.getElementById("combo");
const elModoAtual = document.getElementById("modo-atual");
const elBarra = document.getElementById("barra-progresso");
const elConfete = document.getElementById("confete");
const elTelaModos = document.getElementById("tela-modos");
const elModal = document.getElementById("modal-fim");
const elFimTitulo = document.getElementById("fim-titulo");
const elFimStats = document.getElementById("fim-stats");
const elFimRanking = document.getElementById("fim-ranking");
const elFimAviso = document.getElementById("fim-aviso");
const btnDica = document.getElementById("btn-dica");
const btnRevelar = document.getElementById("btn-revelar");
const btnSom = document.getElementById("btn-som");
const btnContinuar = document.getElementById("btn-continuar");
const elPistas = [];
const elTextoPista = [];

document.getElementById("total").textContent = PALAVRAS.length;


// 4) POSIÇÃO DAS LETRAS

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


// 5) VERIFICAR SE A CASA PERTENCE A UMA PALAVRA

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


// 6) LER AS LETRAS DIGITADAS

function textoDigitado(p) {

    let texto = "";

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        texto = texto + inputs[pos.linha][pos.coluna].value;
    }

    return texto;
}


// 7) CRIAR A GRADE

for (let l = 0; l < LINHAS; l++) {

    grade[l] = [];
    numeros[l] = [];
    inputs[l] = [];
    casas[l] = [];
    travadas[l] = [];

    for (let c = 0; c < COLUNAS; c++) {

        grade[l][c] = "";
        numeros[l][c] = 0;
        travadas[l][c] = "";
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
    pontuada[n] = false;
    ultimoErro[n] = "";
}


// 8) NUMERAR AS PISTAS

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


// 9) MOSTRAR O TABULEIRO

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
            input.setAttribute("autocapitalize", "characters");
            input.setAttribute("autocorrect", "off");
            input.setAttribute("spellcheck", "false");

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


// 10) ORGANIZAR AS PISTAS POR NÚMERO

let ordem = [];

for (let n = 0; n < PALAVRAS.length; n++) {
    ordem.push(n);
}

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
        '<span class="t"></span>' +
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
    elTextoPista[n] = li.querySelector(".t");
}


// 11) FUNÇÕES AUXILIARES

function formatar(segundos) {

    if (segundos < 0) {
        segundos = 0;
    }

    let m = Math.floor(segundos / 60);
    let s = segundos % 60;

    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
}


function mostrarMensagem(texto, tipo) {

    elMensagem.textContent = texto;
    elMensagem.className = "mensagem" + (tipo ? " " + tipo : "");
}


function mostrarFato(n) {

    elFato.innerHTML = "<strong>💡 Sabia que?</strong> " + PALAVRAS[n].curiosidade;
    elFato.hidden = false;
}


function atualizarTextoDasPistas() {

    for (let n = 0; n < PALAVRAS.length; n++) {

        let p = PALAVRAS[n];
        let texto = p.pista;

        if (config !== null && config.mostrarTamanho === true) {
            texto = texto + " (" + p.resposta.length + " letras)";
        }

        elTextoPista[n].textContent = texto;
    }
}


function atualizarStats() {

    if (config === null) {
        return;
    }

    let limitado = config.tempoLimite > 0;

    elTempo.textContent = formatar(limitado ? restante : decorrido);
    elRotuloTempo.textContent = limitado ? "Tempo restante" : "Tempo";

    if (limitado && restante <= 60) {
        elTempo.classList.add("urgente");
    } else {
        elTempo.classList.remove("urgente");
    }

    elPontos.textContent = pontos;
    elCombo.textContent = "x" + combo;
    elModoAtual.textContent = config.nome;

    btnDica.textContent = "💡 Dica (" + dicasRestantes + ")";
    btnDica.disabled = (dicasRestantes <= 0 || jogoAtivo === false);
    btnRevelar.disabled = (jogoAtivo === false);
}


function tirarTempo(segundos) {

    if (config.tempoLimite > 0 && segundos > 0) {

        restante = restante - segundos;

        if (restante < 0) {
            restante = 0;
        }
    }
}


function verificarTempo() {

    if (jogoAtivo === true && config.tempoLimite > 0 && restante <= 0) {
        terminar(false);
    }
}


function verificarVitoria() {

    if (jogoAtivo === true && contarAcertos() === PALAVRAS.length) {
        terminar(true);
    }
}


// 12) EFEITOS (animação, som e confete)

function animar(n, classe) {

    let p = PALAVRAS[n];

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);
        let casa = casas[pos.linha][pos.coluna];

        casa.style.animationDelay = (classe === "pulo" ? i * 50 : 0) + "ms";
        casa.classList.remove(classe);
        void casa.offsetWidth;
        casa.classList.add(classe);
    }

    setTimeout(function () {

        for (let i = 0; i < p.resposta.length; i++) {

            let pos = posicao(p, i);
            let casa = casas[pos.linha][pos.coluna];

            casa.classList.remove(classe);
            casa.style.animationDelay = "";
        }
    }, 1000);
}


function nota(freq, inicio, duracao, tipo, volume) {

    let osc = audioCtx.createOscillator();
    let ganho = audioCtx.createGain();

    osc.type = tipo;
    osc.frequency.value = freq;

    ganho.gain.setValueAtTime(0.0001, inicio);
    ganho.gain.exponentialRampToValueAtTime(volume, inicio + 0.01);
    ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);

    osc.connect(ganho);
    ganho.connect(audioCtx.destination);

    osc.start(inicio);
    osc.stop(inicio + duracao + 0.02);
}


function tocar(tipo) {

    if (mudo === true) {
        return;
    }

    let agora = Date.now();

    if (tipo !== "vitoria" && tipo !== "derrota" && agora - ultimoSom < 90) {
        return;
    }

    ultimoSom = agora;

    try {

        if (audioCtx === null) {

            let AC = window.AudioContext || window.webkitAudioContext;

            if (!AC) {
                return;
            }

            audioCtx = new AC();
        }

        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        let t = audioCtx.currentTime;

        if (tipo === "acerto") {
            nota(660, t, 0.12, "sine", 0.15);
            nota(880, t + 0.1, 0.18, "sine", 0.15);
        } else if (tipo === "erro") {
            nota(220, t, 0.15, "square", 0.08);
            nota(160, t + 0.13, 0.22, "square", 0.08);
        } else if (tipo === "dica") {
            nota(520, t, 0.15, "triangle", 0.15);
        } else if (tipo === "vitoria") {
            nota(523, t, 0.15, "sine", 0.18);
            nota(659, t + 0.15, 0.15, "sine", 0.18);
            nota(784, t + 0.3, 0.15, "sine", 0.18);
            nota(1047, t + 0.45, 0.4, "sine", 0.18);
        } else if (tipo === "derrota") {
            nota(330, t, 0.25, "sawtooth", 0.08);
            nota(262, t + 0.25, 0.25, "sawtooth", 0.08);
            nota(196, t + 0.5, 0.4, "sawtooth", 0.08);
        }

    } catch (e) {
        // sem áudio disponível: segue o jogo normalmente
    }
}


function alternarSom() {

    mudo = !mudo;

    btnSom.textContent = mudo ? "🔇 Som desligado" : "🔊 Som ligado";

    try {
        localStorage.setItem("cruzadinha-mudo", mudo ? "1" : "0");
    } catch (e) {
        // sem localStorage
    }
}


function confete() {

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    let ctx = elConfete.getContext("2d");

    elConfete.width = window.innerWidth;
    elConfete.height = window.innerHeight;
    elConfete.hidden = false;

    let cores = ["#e0a458", "#f2b866", "#7fdc9c", "#ffe9a8", "#f4a3a3", "#9fc4b6"];
    let pecas = [];

    for (let i = 0; i < 160; i++) {

        pecas.push({
            x: Math.random() * elConfete.width,
            y: -Math.random() * elConfete.height * 0.6,
            vx: (Math.random() - 0.5) * 4,
            vy: 2 + Math.random() * 4,
            tam: 6 + Math.random() * 6,
            cor: cores[Math.floor(Math.random() * cores.length)],
            ang: Math.random() * 6.28,
            giro: (Math.random() - 0.5) * 0.3
        });
    }

    let inicio = Date.now();

    function quadro() {

        ctx.clearRect(0, 0, elConfete.width, elConfete.height);

        let vivas = 0;

        for (let i = 0; i < pecas.length; i++) {

            let p = pecas[i];

            p.x = p.x + p.vx;
            p.y = p.y + p.vy;
            p.vy = p.vy + 0.05;
            p.ang = p.ang + p.giro;

            if (p.y < elConfete.height + 20) {

                vivas++;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.ang);
                ctx.fillStyle = p.cor;
                ctx.fillRect(-p.tam / 2, -p.tam / 4, p.tam, p.tam / 2);
                ctx.restore();
            }
        }

        if (vivas > 0 && Date.now() - inicio < 6000) {

            requestAnimationFrame(quadro);

        } else {

            ctx.clearRect(0, 0, elConfete.width, elConfete.height);
            elConfete.hidden = true;
        }
    }

    quadro();
}


// 13) CLICAR EM UMA CASA

function clicarNaCasa(linha, coluna) {

    if (jogoAtivo === false) {
        return;
    }

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


// 14) CLICAR EM UMA PISTA

function clicarNaPista(n) {

    if (jogoAtivo === false) {
        return;
    }

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


// 15) DIGITAR UMA LETRA

function digitar(linha, coluna) {

    if (jogoAtivo === false) {
        return;
    }

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

    // correção automática (depende do modo)
    verificarPalavrasDaCasa(linha, coluna, "auto");

    pintar();

    if (texto !== "") {
        irParaCasaDaPalavra(linha, coluna, 1);
    }

    destacar();
    atualizarStats();
    verificarVitoria();
    salvar();
}


// 16) APERTAR TECLAS (Backspace, espaço e setas)

function apertarTecla(e, linha, coluna) {

    if (jogoAtivo === false) {
        return;
    }

    if (e.key === "Backspace" && inputs[linha][coluna].value === "") {

        e.preventDefault();

        irParaCasaDaPalavra(linha, coluna, -1);

    } else if (e.key === " ") {

        e.preventDefault();

        trocarDirecao(linha, coluna);

    } else if (e.key === "ArrowLeft") {

        e.preventDefault();
        moverSeta(linha, coluna, 0, -1);

    } else if (e.key === "ArrowRight") {

        e.preventDefault();
        moverSeta(linha, coluna, 0, 1);

    } else if (e.key === "ArrowUp") {

        e.preventDefault();
        moverSeta(linha, coluna, -1, 0);

    } else if (e.key === "ArrowDown") {

        e.preventDefault();
        moverSeta(linha, coluna, 1, 0);
    }
}


function trocarDirecao(linha, coluna) {

    let candidatas = palavrasDaCasa(linha, coluna);

    if (candidatas.length === 2) {

        if (palavraAtual === candidatas[0]) {
            palavraAtual = candidatas[1];
        } else {
            palavraAtual = candidatas[0];
        }

    } else {
        palavraAtual = candidatas[0];
    }

    casaAtual = {
        linha: linha,
        coluna: coluna
    };

    destacar();
}


function moverSeta(linha, coluna, passoLinha, passoColuna) {

    let l = linha + passoLinha;
    let c = coluna + passoColuna;

    // procura a próxima casa de jogo naquela direção (pula espaços vazios)
    while (l >= 0 && l < LINHAS && c >= 0 && c < COLUNAS) {

        if (inputs[l][c] !== undefined) {

            let direcaoDesejada = (passoLinha === 0) ? "H" : "V";
            let candidatas = palavrasDaCasa(l, c);
            let escolhida = candidatas[0];

            for (let i = 0; i < candidatas.length; i++) {

                if (PALAVRAS[candidatas[i]].direcao === direcaoDesejada) {
                    escolhida = candidatas[i];
                }
            }

            palavraAtual = escolhida;
            casaAtual = {
                linha: l,
                coluna: c
            };

            inputs[l][c].focus();
            inputs[l][c].select();

            destacar();
            return;
        }

        l = l + passoLinha;
        c = c + passoColuna;
    }
}


// 17) IR PARA A PRÓXIMA OU ANTERIOR CASA (pulando letras travadas)

function irParaCasaDaPalavra(linha, coluna, passo) {

    if (palavraAtual === -1) {
        return;
    }

    let p = PALAVRAS[palavraAtual];

    let indice = indiceNaPalavra(p, linha, coluna);

    let novo = indice + passo;

    while (novo >= 0 && novo < p.resposta.length) {

        let pos = posicao(p, novo);

        if (travadas[pos.linha][pos.coluna] === "") {

            casaAtual = pos;

            inputs[pos.linha][pos.coluna].focus();
            inputs[pos.linha][pos.coluna].select();

            return;
        }

        novo = novo + passo;
    }
}


// 18) AVALIAR PALAVRAS, PONTOS E COMBO

function avaliarPalavra(n, origem) {

    // no modo difícil a correção só acontece no botão Conferir
    if (origem === "auto" && config.autoConferir === "nenhuma") {
        return;
    }

    let p = PALAVRAS[n];
    let texto = textoDigitado(p);
    let completa = (texto.length === p.resposta.length);

    if (texto === p.resposta) {

        if (resultado[n] !== "certa") {

            resultado[n] = "certa";

            if (pontuada[n] === false) {
                pontuada[n] = true;
                acertou(n);
            }
        }

        return;
    }

    if (origem === "botao") {

        resultado[n] = "errada";

    } else if (completa === true && config.autoConferir === "todas") {

        resultado[n] = "errada";

    } else {

        return;
    }

    if (completa === true && ultimoErro[n] !== texto) {

        ultimoErro[n] = texto;
        errou(n);
    }
}


function verificarPalavrasDaCasa(linha, coluna, origem) {

    let lista = palavrasDaCasa(linha, coluna);

    for (let k = 0; k < lista.length; k++) {
        avaliarPalavra(lista[k], origem);
    }
}


function acertou(n) {

    combo++;

    if (combo > melhorCombo) {
        melhorCombo = combo;
    }

    let ganho = Math.round((100 + (combo - 1) * 25) * config.multiplicador);

    pontos = pontos + ganho;

    let texto = "+" + ganho + " pontos";

    if (combo > 1) {
        texto = texto + " · combo x" + combo;
    }

    if (config.bonusTempo > 0) {
        restante = restante + config.bonusTempo;
        texto = texto + " · +" + config.bonusTempo + "s";
    }

    mostrarMensagem(texto, "ok");
    mostrarFato(n);
    animar(n, "pulo");
    tocar("acerto");
}


function errou(n) {

    erros++;
    combo = 0;

    pontos = pontos - config.penalidadeErro;

    if (pontos < 0) {
        pontos = 0;
    }

    tirarTempo(config.penalidadeTempoErro);

    let texto = "Palavra errada!";

    if (config.penalidadeErro > 0) {
        texto = texto + " -" + config.penalidadeErro + " pontos";
    }

    if (config.penalidadeTempoErro > 0) {
        texto = texto + " · -" + config.penalidadeTempoErro + "s";
    }

    mostrarMensagem(texto, "ruim");
    animar(n, "treme");
    tocar("erro");
}


// 19) CONFERIR AS RESPOSTAS

function conferir() {

    if (jogoAtivo === false) {
        return;
    }

    for (let n = 0; n < PALAVRAS.length; n++) {
        avaliarPalavra(n, "botao");
    }

    pintar();
    atualizarStats();

    let acertos = contarAcertos();

    if (acertos === PALAVRAS.length) {

        verificarVitoria();

    } else {

        mostrarMensagem("Faltam " + (PALAVRAS.length - acertos) + " palavras. Veja nas pistas quais estão erradas (✗).", "");
        verificarTempo();
    }

    salvar();
}


// 20) DICA E REVELAR PALAVRA

function pedirDica() {

    if (jogoAtivo === false) {
        return;
    }

    if (palavraAtual === -1) {
        mostrarMensagem("Clique numa casa ou numa pista para escolher a palavra.", "");
        return;
    }

    if (dicasRestantes <= 0) {
        mostrarMensagem("Suas dicas acabaram neste modo.", "ruim");
        return;
    }

    let p = PALAVRAS[palavraAtual];
    let alvo = null;

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        if (inputs[pos.linha][pos.coluna].value !== p.resposta[i]) {
            alvo = pos;
            alvo.letra = p.resposta[i];
            break;
        }
    }

    if (alvo === null) {
        mostrarMensagem("Essa palavra já está certa!", "ok");
        return;
    }

    let mudou = (inputs[alvo.linha][alvo.coluna].value !== alvo.letra);

    inputs[alvo.linha][alvo.coluna].value = alvo.letra;
    travar(alvo.linha, alvo.coluna, "dica");

    if (mudou === true) {
        limparResultados(alvo.linha, alvo.coluna);
    }

    dicasRestantes--;
    dicasUsadas++;
    combo = 0;

    pontos = pontos - config.penalidadeDica;

    if (pontos < 0) {
        pontos = 0;
    }

    tirarTempo(config.penalidadeTempoDica);

    let texto = "Dica usada: -" + config.penalidadeDica + " pontos";

    if (config.penalidadeTempoDica > 0) {
        texto = texto + " · -" + config.penalidadeTempoDica + "s";
    }

    mostrarMensagem(texto, "ruim");
    tocar("dica");

    verificarPalavrasDaCasa(alvo.linha, alvo.coluna, "auto");

    focarProximaVazia(palavraAtual);

    pintar();
    destacar();
    atualizarStats();
    verificarVitoria();
    verificarTempo();
    salvar();
}


function cancelarConfirmacao() {

    revelarConfirmando = -1;

    clearTimeout(timerConfirmar);

    btnRevelar.textContent = "👁 Revelar palavra";
}


function revelar() {

    if (jogoAtivo === false) {
        return;
    }

    if (palavraAtual === -1) {
        mostrarMensagem("Escolha uma palavra primeiro (clique numa casa ou numa pista).", "");
        return;
    }

    let n = palavraAtual;
    let p = PALAVRAS[n];

    if (resultado[n] === "certa") {
        mostrarMensagem("Essa palavra já está certa!", "ok");
        return;
    }

    let aviso = "Revelar a palavra custa " + config.penalidadeRevelar + " pontos";

    if (config.penalidadeTempoRevelar > 0) {
        aviso = aviso + " e " + config.penalidadeTempoRevelar + " segundos";
    }

    aviso = aviso + " e zera o combo. Clique em \"Confirmar revelar\" para continuar.";

    // confirmação dentro da página (o confirm() do navegador pode travar o teclado)
    if (revelarConfirmando !== n) {

        revelarConfirmando = n;

        btnRevelar.textContent = "⚠ Confirmar revelar";
        mostrarMensagem(aviso, "ruim");

        clearTimeout(timerConfirmar);
        timerConfirmar = setTimeout(cancelarConfirmacao, 6000);

        return;
    }

    cancelarConfirmacao();

    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        let mudou = (inputs[pos.linha][pos.coluna].value !== p.resposta[i]);

        inputs[pos.linha][pos.coluna].value = p.resposta[i];

        if (travadas[pos.linha][pos.coluna] === "") {
            travar(pos.linha, pos.coluna, "dica");
        }

        // só apaga as marcas das outras palavras se a letra realmente mudou
        if (mudou === true) {
            limparResultados(pos.linha, pos.coluna);
        }
    }

    resultado[n] = "certa";
    pontuada[n] = true;
    reveladas++;
    combo = 0;

    pontos = pontos - config.penalidadeRevelar;

    if (pontos < 0) {
        pontos = 0;
    }

    tirarTempo(config.penalidadeTempoRevelar);

    // palavras que cruzam com a revelada podem ter ficado completas
    for (let i = 0; i < p.resposta.length; i++) {

        let pos = posicao(p, i);

        verificarPalavrasDaCasa(pos.linha, pos.coluna, "auto");
    }

    mostrarMensagem("Palavra revelada: -" + config.penalidadeRevelar + " pontos", "ruim");
    mostrarFato(n);
    animar(n, "pulo");
    tocar("dica");

    focarProximaVazia(n);

    pintar();
    destacar();
    atualizarStats();
    verificarVitoria();
    verificarTempo();
    salvar();
}


// 21) TRAVAR CASAS (letra inicial ou dica)

function travar(linha, coluna, tipo) {

    inputs[linha][coluna].readOnly = true;

    travadas[linha][coluna] = tipo;

    casas[linha][coluna].classList.add(tipo);
}


// 21b) DEPOIS DE REVELAR OU USAR DICA: IR PARA A PRÓXIMA CASA VAZIA

function focarProximaVazia(n) {

    let inicio = ordem.indexOf(n);

    for (let k = 0; k < ordem.length; k++) {

        let m = ordem[(inicio + k) % ordem.length];

        if (resultado[m] === "certa") {
            continue;
        }

        let p = PALAVRAS[m];

        for (let i = 0; i < p.resposta.length; i++) {

            let pos = posicao(p, i);

            if (inputs[pos.linha][pos.coluna].value === "") {

                palavraAtual = m;
                casaAtual = pos;

                inputs[pos.linha][pos.coluna].focus();
                inputs[pos.linha][pos.coluna].select();

                return;
            }
        }
    }
}


// 22) CONTAR OS ACERTOS

function contarAcertos() {

    let total = 0;

    for (let n = 0; n < PALAVRAS.length; n++) {

        if (resultado[n] === "certa") {
            total++;
        }
    }

    return total;
}


// 23) APAGAR MARCAS DE UMA PALAVRA

function limparResultados(linha, coluna) {

    let lista = palavrasDaCasa(linha, coluna);

    for (let k = 0; k < lista.length; k++) {

        resultado[lista[k]] = "";
    }
}


function apagarMarcas(linha, coluna) {

    limparResultados(linha, coluna);

    mostrarMensagem("", "");

    pintar();
}


// 24) PINTAR ACERTOS E ERROS

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

    let acertos = contarAcertos();

    elContador.getElementsByTagName("strong")[0].textContent = acertos;

    elBarra.style.width = (acertos / PALAVRAS.length * 100) + "%";
}


// 25) DESTACAR A PALAVRA SELECIONADA

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


// 26) CRONÔMETRO

function tick() {

    if (jogoAtivo === false) {
        return;
    }

    decorrido++;

    if (config.tempoLimite > 0) {

        restante--;

        if (restante <= 0) {

            restante = 0;
            atualizarStats();
            terminar(false);
            return;
        }
    }

    atualizarStats();

    if (decorrido % 5 === 0) {
        salvar();
    }
}


// 27) INICIAR UM JOGO

function limparTabuleiro() {

    for (let l = 0; l < LINHAS; l++) {

        for (let c = 0; c < COLUNAS; c++) {

            travadas[l][c] = "";

            casas[l][c].classList.remove("dada");
            casas[l][c].classList.remove("dica");
            casas[l][c].classList.remove("pulo");
            casas[l][c].classList.remove("treme");

            if (inputs[l][c] !== undefined) {

                inputs[l][c].value = "";
                inputs[l][c].readOnly = false;
                inputs[l][c].disabled = false;
            }
        }
    }
}


function iniciarJogo(id, salvo) {

    modo = id;
    config = MODOS[id];

    limparTabuleiro();

    pontos = 0;
    combo = 0;
    melhorCombo = 0;
    dicasRestantes = config.dicas;
    dicasUsadas = 0;
    reveladas = 0;
    erros = 0;
    decorrido = 0;
    restante = config.tempoLimite;

    for (let n = 0; n < PALAVRAS.length; n++) {

        resultado[n] = "";
        pontuada[n] = false;
        ultimoErro[n] = "";
    }

    cancelarConfirmacao();
    atualizarTextoDasPistas();

    // modo fácil: a primeira letra de cada palavra já vem preenchida
    if (config.primeiraLetra === true) {

        for (let n = 0; n < PALAVRAS.length; n++) {

            let p = PALAVRAS[n];
            let pos = posicao(p, 0);

            inputs[pos.linha][pos.coluna].value = p.resposta[0];
            travar(pos.linha, pos.coluna, "dada");
        }
    }

    if (salvo) {
        restaurar(salvo);
    }

    palavraAtual = -1;
    casaAtual = null;

    elTelaModos.hidden = true;
    elModal.hidden = true;
    elFato.hidden = true;
    elConfete.hidden = true;

    mostrarMensagem("Modo " + config.nome + ": " + config.resumo, "");

    jogoAtivo = true;

    pintar();
    destacar();
    atualizarStats();

    clearInterval(intervalo);
    intervalo = setInterval(tick, 1000);

    salvar();
}


function reiniciar() {

    if (modo !== null) {
        iniciarJogo(modo, null);
    }
}


// 28) FIM DE JOGO

function desabilitarTudo() {

    for (let l = 0; l < LINHAS; l++) {

        for (let c = 0; c < COLUNAS; c++) {

            if (inputs[l][c] !== undefined) {
                inputs[l][c].disabled = true;
            }
        }
    }
}


function terminar(venceu) {

    if (jogoAtivo === false) {
        return;
    }

    jogoAtivo = false;
    clearInterval(intervalo);

    let bonus = 0;

    if (venceu === true) {

        let segundosBonus = 0;

        if (config.tempoLimite > 0) {
            segundosBonus = restante;
        } else {
            segundosBonus = 600 - decorrido;
        }

        if (segundosBonus < 0) {
            segundosBonus = 0;
        }

        bonus = Math.round(segundosBonus * config.multiplicador);
        pontos = pontos + bonus;
    }

    desabilitarTudo();
    atualizarStats();
    limparSave();

    let ranking = [];
    let posicaoRanking = -1;

    if (venceu === true) {

        let r = salvarRanking(modo, {
            pontos: pontos,
            tempo: decorrido,
            data: new Date().toLocaleDateString("pt-BR")
        });

        ranking = r.lista;
        posicaoRanking = r.posicao;

    } else {

        ranking = lerRanking(modo);
    }

    ultimoResultado =
        "🧩 Cruzadinha de Arquitetura Computacional\n" +
        "Modo " + config.nome + " · " + (venceu ? "completa!" : contarAcertos() + "/" + PALAVRAS.length + " palavras") + "\n" +
        "⏱ " + formatar(decorrido) + " · ⭐ " + pontos + " pontos\n" +
        "💡 " + dicasUsadas + " dicas · 🔥 combo máx. x" + melhorCombo;

    montarModal(venceu, bonus, ranking, posicaoRanking);

    if (venceu === true) {

        mostrarMensagem("Parabéns! Você completou a cruzadinha!", "vitoria");
        tocar("vitoria");
        confete();

    } else {

        mostrarMensagem("O tempo acabou! Faltaram " + (PALAVRAS.length - contarAcertos()) + " palavras.", "ruim");
        tocar("derrota");
    }
}


function adicionarStat(rotulo, valor) {

    let li = document.createElement("li");

    li.innerHTML = "<span></span><strong></strong>";
    li.getElementsByTagName("span")[0].textContent = rotulo;
    li.getElementsByTagName("strong")[0].textContent = valor;

    elFimStats.appendChild(li);
}


function montarModal(venceu, bonus, ranking, posicaoRanking) {

    elFimTitulo.textContent = venceu ? "Você completou a cruzadinha! 🎉" : "Tempo esgotado ⏰";
    elFimAviso.textContent = "";

    elFimStats.innerHTML = "";

    adicionarStat("Modo", config.nome);
    adicionarStat("Pontos", pontos + (bonus > 0 ? " (inclui +" + bonus + " de bônus de tempo)" : ""));
    adicionarStat("Tempo gasto", formatar(decorrido));
    adicionarStat("Palavras certas", contarAcertos() + " de " + PALAVRAS.length);
    adicionarStat("Maior combo", "x" + melhorCombo);
    adicionarStat("Dicas usadas", dicasUsadas);
    adicionarStat("Palavras reveladas", reveladas);
    adicionarStat("Palavras erradas", erros);

    elFimRanking.innerHTML = "";

    if (ranking.length === 0) {

        let li = document.createElement("li");

        li.textContent = "Nenhuma partida concluída neste modo ainda.";
        elFimRanking.appendChild(li);
    }

    for (let i = 0; i < ranking.length; i++) {

        let li = document.createElement("li");

        li.textContent = ranking[i].pontos + " pts · " + formatar(ranking[i].tempo) + " · " + ranking[i].data;

        if (i === posicaoRanking) {
            li.className = "novo";
            li.textContent = li.textContent + "  ← você";
        }

        elFimRanking.appendChild(li);
    }

    elModal.hidden = false;
}


function compartilhar() {

    let texto = ultimoResultado;

    function manual() {
        window.prompt("Copie o resultado:", texto);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {

        navigator.clipboard.writeText(texto).then(function () {
            elFimAviso.textContent = "Resultado copiado! Agora é só colar onde quiser.";
        }).catch(manual);

    } else {

        manual();
    }
}


// 29) RANKING LOCAL

function lerRanking(id) {

    try {

        let lista = JSON.parse(localStorage.getItem("cruzadinha-ranking-" + id));

        if (Array.isArray(lista)) {
            return lista;
        }

    } catch (e) {
        // sem localStorage
    }

    return [];
}


function salvarRanking(id, entrada) {

    let lista = lerRanking(id);

    lista.push(entrada);

    // Ordenar do maior para o menor ponto, usando for no lugar de sort()

    for (let i = 0; i < lista.length; i++) {

        for (let j = 0; j < lista.length - 1; j++) {

            if (lista[j].pontos < lista[j + 1].pontos) {

                let auxiliar = lista[j];

                lista[j] = lista[j + 1];
                lista[j + 1] = auxiliar;
            }
        }
    }

    lista = lista.slice(0, 5);

    try {
        localStorage.setItem("cruzadinha-ranking-" + id, JSON.stringify(lista));
    } catch (e) {
        // sem localStorage
    }

    let posicaoRanking = -1;

    for (let i = 0; i < lista.length; i++) {

        if (lista[i] === entrada) {
            posicaoRanking = i;
        }
    }

    return {
        lista: lista,
        posicao: posicaoRanking
    };
}


function atualizarRecordes() {

    let ids = ["facil", "medio", "dificil"];

    for (let k = 0; k < ids.length; k++) {

        let lista = lerRanking(ids[k]);
        let el = document.getElementById("recorde-" + ids[k]);

        if (lista.length > 0) {
            el.textContent = "Recorde: " + lista[0].pontos + " pts";
        } else {
            el.textContent = "Recorde: —";
        }
    }
}


// 30) SALVAR E CONTINUAR O JOGO

function salvar() {

    if (jogoAtivo === false || modo === null) {
        return;
    }

    let letras = [];
    let trav = [];

    for (let l = 0; l < LINHAS; l++) {

        letras[l] = [];
        trav[l] = [];

        for (let c = 0; c < COLUNAS; c++) {

            if (inputs[l][c] !== undefined) {
                letras[l][c] = inputs[l][c].value;
            } else {
                letras[l][c] = "";
            }

            trav[l][c] = travadas[l][c];
        }
    }

    let dados = {
        versao: 1,
        modo: modo,
        letras: letras,
        travadas: trav,
        resultado: resultado,
        pontuada: pontuada,
        ultimoErro: ultimoErro,
        pontos: pontos,
        combo: combo,
        melhorCombo: melhorCombo,
        dicasRestantes: dicasRestantes,
        dicasUsadas: dicasUsadas,
        reveladas: reveladas,
        erros: erros,
        decorrido: decorrido,
        restante: restante
    };

    try {
        localStorage.setItem("cruzadinha-save", JSON.stringify(dados));
    } catch (e) {
        // sem localStorage
    }
}


function lerSave() {

    try {

        let dados = JSON.parse(localStorage.getItem("cruzadinha-save"));

        if (dados && dados.versao === 1 && MODOS[dados.modo]) {
            return dados;
        }

    } catch (e) {
        // sem localStorage ou dados inválidos
    }

    return null;
}


function limparSave() {

    try {
        localStorage.removeItem("cruzadinha-save");
    } catch (e) {
        // sem localStorage
    }
}


function restaurar(d) {

    for (let l = 0; l < LINHAS; l++) {

        for (let c = 0; c < COLUNAS; c++) {

            if (inputs[l][c] !== undefined) {

                inputs[l][c].value = d.letras[l][c];

                if (d.travadas[l][c] !== "") {
                    travar(l, c, d.travadas[l][c]);
                }
            }
        }
    }

    for (let n = 0; n < PALAVRAS.length; n++) {

        resultado[n] = d.resultado[n];
        pontuada[n] = d.pontuada[n];
        ultimoErro[n] = d.ultimoErro[n];
    }

    pontos = d.pontos;
    combo = d.combo;
    melhorCombo = d.melhorCombo;
    dicasRestantes = d.dicasRestantes;
    dicasUsadas = d.dicasUsadas;
    reveladas = d.reveladas;
    erros = d.erros;
    decorrido = d.decorrido;
    restante = d.restante;
}


// 31) TELA DE ESCOLHA DE MODO

function abrirTelaModos() {

    if (jogoAtivo === true) {

        salvar();

        jogoAtivo = false;
        clearInterval(intervalo);
    }

    atualizarRecordes();

    let salvo = lerSave();

    if (salvo !== null) {

        btnContinuar.hidden = false;
        btnContinuar.textContent = "▶ Continuar jogo salvo (" + MODOS[salvo.modo].nome + " · " + formatar(salvo.decorrido) + ")";

    } else {

        btnContinuar.hidden = true;
    }

    elModal.hidden = true;
    elTelaModos.hidden = false;
}


// 32) BOTÕES

document.getElementById("btn-conferir").addEventListener("click", conferir);
document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);
document.getElementById("btn-modos").addEventListener("click", abrirTelaModos);
document.getElementById("btn-compartilhar").addEventListener("click", compartilhar);
document.getElementById("btn-jogar-de-novo").addEventListener("click", abrirTelaModos);

document.getElementById("btn-ver-tabuleiro").addEventListener("click", function () {
    elModal.hidden = true;
});

btnDica.addEventListener("click", pedirDica);
btnRevelar.addEventListener("click", revelar);
btnSom.addEventListener("click", alternarSom);

btnContinuar.addEventListener("click", function () {

    let salvo = lerSave();

    if (salvo !== null) {
        iniciarJogo(salvo.modo, salvo);
    }
});

let cartoes = document.getElementsByClassName("modo-card");

for (let k = 0; k < cartoes.length; k++) {

    cartoes[k].addEventListener("click", function () {
        iniciarJogo(this.getAttribute("data-modo"), null);
    });
}

window.addEventListener("beforeunload", salvar);


// INICIAR

try {
    mudo = (localStorage.getItem("cruzadinha-mudo") === "1");
} catch (e) {
    mudo = false;
}

btnSom.textContent = mudo ? "🔇 Som desligado" : "🔊 Som ligado";

pintar();
destacar();
abrirTelaModos();