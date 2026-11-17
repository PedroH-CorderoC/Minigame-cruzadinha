# Cruzadinha de Arquitetura Computacional

Jogo de cruzadinha que roda no navegador para treinar os termos da aula de Tópicos de Arquitetura Computacional.
Feito com HTML, CSS e JavaScript puros.

**Site publicado:** https://SEU-USUARIO.github.io/arqcomp-cruzadinha/

## Como jogar

1. Leia as pistas das listas **Horizontais** e **Verticais** (os números batem com os do tabuleiro).
2. Clique numa casa e digite as letras direto no tabuleiro (sem acento e sem espaço). Clique de novo na mesma casa, ou use a barra de espaço, para alternar entre horizontal e vertical.
3. Use as setas do teclado para andar pelo tabuleiro e Backspace para apagar.
4. Clique em **Conferir** para ver quais palavras estão certas (verde, ✓) e quais estão erradas (vermelho, ✗).
5. O contador mostra quantas palavras você acertou, por exemplo "8 de 16 palavras".
6. **Reiniciar** limpa o tabuleiro.

## Palavras e pistas (16 de 16)

| Nº | Direção | Resposta | Pista |
|----|---------|----------|-------|
| 1 | Vertical | CPU | Chip que executa as instruções dos programas; o cérebro do computador. |
| 2 | Vertical | MICROCONTROLADOR | Chip que reúne processador, memória e portas de entrada e saída, comum em sistemas embarcados. |
| 3 | Vertical | DMA | Recurso que deixa periféricos transferirem informações à memória sem ocupar a CPU. |
| 4 | Horizontal | RAM | Memória volátil principal onde ficam programas e dados em uso; perde tudo ao desligar. |
| 4 | Vertical | REGISTRADORES | Pequenas posições de armazenamento dentro da CPU, as mais rápidas de todas. |
| 5 | Horizontal | QUADCORE | Processador com quatro núcleos de processamento no mesmo chip. |
| 6 | Vertical | EEPROM | Memória não volátil regravável, que apaga e grava byte a byte; guarda pequenas configurações. |
| 7 | Vertical | CACHE | Memória pequena e ultrarrápida entre CPU e RAM, que guarda o mais usado. |
| 8 | Horizontal | UC | Parte da CPU que coordena e dirige o que os outros blocos fazem. |
| 9 | Horizontal | ROM | Memória não volátil gravada de fábrica, cujo conteúdo normalmente não muda. |
| 10 | Horizontal | MEMORIADEMASSA | Guarda arquivos e programas por muito tempo e em grande volume, como HD e SSD. |
| 11 | Horizontal | DUALCORE | Processador com dois núcleos de processamento no mesmo chip. |
| 12 | Vertical | FLASH | Memória não volátil regravável em blocos, usada em pen drives e cartões SD. |
| 13 | Horizontal | ADDRESSBUS | Via que leva da CPU a posição da memória que será lida ou escrita. |
| 14 | Vertical | ULA | Parte da CPU que faz as contas e as operações lógicas. |
| 15 | Horizontal | DATABUS | Via por onde as informações trafegam entre CPU, memória e periféricos. |

## Estrutura

- `index.html`: página do jogo
- `style.css`: visual
- `script.js`: lógica (tabuleiro, numeração, Conferir, contador, Reiniciar)
- `README.md`: este arquivo
