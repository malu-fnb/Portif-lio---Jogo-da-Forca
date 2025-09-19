import os

def buscar_conta(cadastro, numero_conta):
    try:
        if not cadastro:
            return -2

        for i, conta in enumerate(cadastro):
            if conta['numero_conta'] == numero_conta and conta['status'] == 1:
                return i

        return -1
    except Exception as e:
        print(f"Erro durante a busca: {e}")
        return -3

def cadastrar_conta(cadastro, numero_conta):
    try:
        if buscar_conta(cadastro, numero_conta) == -1:
            novo_cliente = {
                'numero_conta': numero_conta,
                'saldo': float(input("Informe o saldo inicial: ")),
                'nome': input("Informe o nome do cliente: "),
                'cpf': input("Informe o CPF do cliente: "),
                'telefone_contato': input("Informe o telefone de contato: "),
                'status': 1  # 1 - Ativo
            }
            cadastro.append(novo_cliente)
            print("Conta cadastrada com sucesso!")
        else:
            print("Número de conta já cadastrado.")
    except Exception as e:
        print(f"Erro durante o cadastro: {e}")

def consultar_saldo(cadastro, numero_conta):
    try:
        index = buscar_conta(cadastro, numero_conta)
        if index != -1:
            print(f"Saldo da conta {numero_conta}: R${cadastro[index]['saldo']:.2f}")
        else:
            print("Conta não cadastrada.")
    except Exception as e:
        print(f"Erro durante a consulta de saldo: {e}")

def fazer_deposito(cadastro, numero_conta):
    try:
        index = buscar_conta(cadastro, numero_conta)
        if index != -1:
            valor_deposito = float(input("Informe o valor do depósito: "))
            cadastro[index]['saldo'] += valor_deposito
            print("Depósito realizado com sucesso!")
        else:
            print("Conta não cadastrada.")
    except Exception as e:
        print(f"Erro durante o depósito: {e}")

def fazer_saque(cadastro, numero_conta):
    try:
        index = buscar_conta(cadastro, numero_conta)
        if index != -1:
            valor_saque = float(input("Informe o valor do saque: "))
            if cadastro[index]['saldo'] >= valor_saque:
                cadastro[index]['saldo'] -= valor_saque
                print("Saque realizado com sucesso!")
            else:
                print("Saldo insuficiente.")
        else:
            print("Conta não cadastrada.")
    except Exception as e:
        print(f"Erro durante o saque: {e}")

def exibir_todas_contas(cadastro):
    try:
        for conta in cadastro:
            print(f"Número da Conta: {conta['numero_conta']}, Nome do Titular: {conta['nome']}, Telefone de Contato: {conta['telefone_contato']}")
    except Exception as e:
        print(f"Erro ao exibir contas: {e}")

def remover_conta(cadastro, numero_conta):
    try:
        index = buscar_conta(cadastro, numero_conta)
        if index != -1:
            cadastro[index]['status'] = 0  # 0 - Deletado
            print("Conta removida (logicamente) com sucesso!")
        else:
            print("Conta não cadastrada.")
    except Exception as e:
        print(f"Erro durante a remoção da conta: {e}")

def limpar_cadastro(cadastro):
    try:
        cadastro[:] = [conta for conta in cadastro if conta['status'] == 1]
        print("Registros deletados (logicamente) foram removidos fisicamente do cadastro.")
    except Exception as e:
        print(f"Erro durante a limpeza do cadastro: {e}")

def main():
    cadastro_contas = []

    while True:
        print("\nMenu:")
        print("1. Cadastrar nova conta")
        print("2. Consultar saldo")
        print("3. Fazer depósito")
        print("4. Fazer saque")
        print("5. Exibir todas as contas")
        print("6. Remover conta")
        print("7. Limpar cadastro")
        print("8. Sair")

        opcao = int(input("Escolha uma opção: "))

        if opcao == 1:
            numero_conta = input("Informe o número da conta: ")
            cadastrar_conta(cadastro_contas, numero_conta)
        elif opcao == 2:
            numero_conta = input("Informe o número da conta: ")
            consultar_saldo(cadastro_contas, numero_conta)
        elif opcao == 3:
            numero_conta = input("Informe o número da conta: ")
            fazer_deposito(cadastro_contas, numero_conta)
        elif opcao == 4:
            numero_conta = input("Informe o número da conta: ")
            fazer_saque(cadastro_contas, numero_conta)
        elif opcao == 5:
            exibir_todas_contas(cadastro_contas)
        elif opcao == 6:
            numero_conta = input("Informe o número da conta: ")
            remover_conta(cadastro_contas, numero_conta)
        elif opcao == 7:
            limpar_cadastro(cadastro_contas)
        elif opcao == 8:
            print("Saindo do programa. Limpando cadastro...")
            limpar_cadastro(cadastro_contas)
            break
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    main()
