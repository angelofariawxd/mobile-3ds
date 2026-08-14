# --- Definição das Variáveis (Exemplo de entrada) ---
bateria_atual = 10  # Valor inteiro de 0 a 100
bola_em_jogo = True  # Valor booleano: True (em jogo) ou False (paralisada)

# --- Estrutura Condicional (If / Elif / Else) ---
if bateria_atual < 15 and bola_em_jogo:
    # Condição 1: Bateria abaixo de 15% E bola em jogo
    print(
        "ALERTA MÁXIMO: Bateria baixa! Substitua a bola na próxima paralisação."
    )

elif bateria_atual < 15 and not bola_em_jogo:
    # Condição 2: Bateria abaixo de 15% E bola parada
    print("Aviso: Bateria baixa. Aproveite a bola parada para trocá-la.")

else:
    # Condição 3: Bateria igual ou acima de 15%
    print("Sistema Trionda operando normalmente. Bateria ok.")
