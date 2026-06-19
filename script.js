const form = document.getElementById("form-imc");  // pega o <form> pelo id
const elErro = document.getElementById("erro");  // pega o <p> de erro
const elResultado = document.getElementById("resultado");  // pega a <section> de resultado
const elValorImc = document.getElementById("valor-imc");  // pega o <span> do número do imc
const elCategoria = document.getElementById("categoria");  // pega o <span> da categoria
const elPonteiro = document.getElementById("gauge-ponteiro");  // pega a <div> do ponteiro

const ESCALA_MIN = 14;  // menor valor de imc considerado na escala visual do gauge
const ESCALA_MAX = 42;  // maior valor de imc considerado na escala visual do gauge

function classificarImc(imc) {  // função que recebe o número do imc e devolve o texto da categoria
  if (imc < 18.5) return "Abaixo do peso";  // testa a primeira faixa
  if (imc < 25) return "Peso normal";  // testa a segunda faixa
  if (imc < 30) return "Sobrepeso";  // testa a terceira faixa
  if (imc < 35) return "Obesidade grau I";  // testa a quarta faixa
  if (imc < 40) return "Obesidade grau II";  // testa a quinta faixa
  return "Obesidade grau III";  // se nenhuma condição acima bateu (imc >= 40)
}

function calcularPosicaoGauge(imc) {  // recebe o imc e devolve a posição (%) do ponteiro na barra
  const percentual = ((imc - ESCALA_MIN) / (ESCALA_MAX - ESCALA_MIN)) * 100;  // calcula a posição proporcional
  return Math.min(100, Math.max(0, percentual));  // garante que o valor fique sempre entre 0 e 100
}

function mostrarErro(mensagem) {  // exibe uma mensagem de erro na tela
  elErro.textContent = mensagem;  // coloca o texto recebido dentro do elemento de erro
  elErro.hidden = false;  // torna o elemento de erro visível
  elResultado.hidden = true;  // esconde o resultado, caso estivesse visível
}

function mostrarResultado(imc, categoria) {  // exibe o resultado do cálculo na tela
  elErro.hidden = true;  // esconde qualquer mensagem de erro anterior
  elResultado.hidden = false;  // torna a área de resultado visível

  elValorImc.textContent = imc.toFixed(1);  // exibe o imc formatado com 1 casa decimal
  elCategoria.textContent = categoria;  // exibe o texto da categoria

  const posicao = calcularPosicaoGauge(imc);  // calcula em que % da barra o ponteiro deve ficar

  requestAnimationFrame(() => {  // espera o navegador estar pronto para a próxima atualização visual
    elPonteiro.style.left = `${posicao}%`;  // move o ponteiro até a posição calculada
  });
}

form.addEventListener("submit", (evento) => {  // escuta o momento em que o formulário é enviado
  evento.preventDefault();  // impede o navegador de recarregar a página

  const pesoTexto = document.getElementById("peso").value;  // lê o texto digitado no campo peso
  const alturaTexto = document.getElementById("altura").value;  // lê o texto digitado no campo altura

  const peso = parseFloat(pesoTexto);  // converte o texto do peso em número decimal
  const altura = parseFloat(alturaTexto);  // converte o texto da altura em número decimal

  if (isNaN(peso) || isNaN(altura)) {  // verifica se a conversão falhou (não é número)
    mostrarErro("Informe peso e altura válidos.");  // exibe mensagem de erro
    return;  // interrompe a função, não calcula nada
  }

  if (peso <= 0 || altura <= 0) {  // verifica se algum valor é zero ou negativo
    mostrarErro("Peso e altura devem ser maiores que zero.");  // exibe mensagem de erro
    return;  // interrompe a função, não calcula nada
  }

  const alturaM = altura / 100;  // converte a altura de centímetros para metros
  const imc = peso / (alturaM ** 2);  // aplica a fórmula do imc: peso / altura(m) ao quadrado

  const categoria = classificarImc(imc);  // descobre a categoria correspondente ao imc calculado

  mostrarResultado(imc, categoria);  // exibe o resultado na tela
});