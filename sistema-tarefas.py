# ==========================================
# SISTEMA DE GESTÃO DE TAREFAS E PRAZOS
# ==========================================

# 1. Entrada de Dados
qtd_tarefas = int(input("Quantas tarefas deseja cadastrar? "))

lista_tarefas = []
for i in range(qtd_tarefas):
    nome = input(f"Digite a tarefa {i + 1}: ")
    lista_tarefas.append(nome)

# 2. Processamento com enumerate() e Tuplas
banco_dados_tarefas = []

for id_tarefa, nome_tarefa in enumerate(lista_tarefas, start=1):
    # Lógica de cálculo do prazo: progressão de 2 dias por tarefa
    prazo_dias = id_tarefa * 2
    status = "Pendente"
    
    # Armazenando os dados em formato de tupla
    registro = (id_tarefa, nome_tarefa, prazo_dias, status)
    banco_dados_tarefas.append(registro)

# 3. Saída de Dados e Desempacotamento de Tuplas
print("\n--- RESUMO DO SISTEMA ---")

for id_tarefa, nome_tarefa, prazo_dias, status in banco_dados_tarefas:
    # Exibição formatada utilizando f-strings
    print(f"ID: {id_tarefa} | Tarefa: {nome_tarefa} | Prazo: {prazo_dias} dias | Status: {status}")

print(f"\nTotal de tarefas gerenciadas: {len(banco_dados_tarefas)}")
