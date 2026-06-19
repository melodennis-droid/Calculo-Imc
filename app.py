# app.py - calculadora de IMC que roda direto no terminal, sem Flask e sem navegador

def classificar_imc(imc):  # função que recebe o valor numérico do imc
    if imc < 18.5:  # testa se está abaixo do peso saudável
        return "Abaixo do peso"  # devolve essa categoria
    elif imc < 25:  # testa se está na faixa considerada normal
        return "Peso normal"  # devolve essa categoria
    elif imc < 30:  # testa se está na faixa de sobrepeso
        return "Sobrepeso"  # devolve essa categoria
    elif imc < 35:  # testa se está no primeiro grau de obesidade
        return "Obesidade grau I"  # devolve essa categoria
    elif imc < 40:  # testa se está no segundo grau de obesidade
        return "Obesidade grau II"  # devolve essa categoria
    else:  # se nenhuma condição acima bateu (imc >= 40)
        return "Obesidade grau III"  # devolve essa categoria


def main():  # função principal, organiza todo o fluxo do programa
    print("=== Calculadora de IMC ===")  # imprime um título no terminal

    peso_texto = input("Digite seu peso (kg): ")  # mostra a pergunta e guarda o que foi digitado (sempre texto)
    altura_texto = input("Digite sua altura (cm): ")  # mostra a pergunta e guarda o que foi digitado (sempre texto)

    try:  # tenta executar um trecho que pode dar erro
        peso = float(peso_texto)  # converte o texto digitado em número decimal
        altura_cm = float(altura_texto)  # converte o texto digitado em número decimal
    except ValueError:  # cai aqui se o texto não puder ser convertido em número
        print("Por favor, digite apenas números.")  # avisa o usuário do erro
        return  # encerra a função main() sem continuar

    if peso <= 0 or altura_cm <= 0:  # verifica se algum valor é zero ou negativo
        print("Peso e altura devem ser maiores que zero.")  # avisa sobre o valor inválido
        return  # encerra a função sem continuar

    altura_m = altura_cm / 100  # converte a altura de centímetros para metros
    imc = peso / (altura_m ** 2)  # aplica a fórmula do imc: peso / altura(m) ao quadrado

    categoria = classificar_imc(imc)  # chama a função para descobrir a categoria do resultado

    print(f"\nSeu IMC é: {imc:.2f}")  # imprime o imc formatado com 2 casas decimais
    print(f"Categoria: {categoria}")  # imprime a categoria correspondente


if __name__ == "__main__":  # só roda o código abaixo se este arquivo for executado diretamente
    main()  # chama a função principal, dando início ao programa