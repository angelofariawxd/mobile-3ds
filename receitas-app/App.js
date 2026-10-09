import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

export default function App() {
  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [formularioVisivel, setFormularioVisivel] = useState(false);

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: 'Bolo de Chocolate',
      ingredientes:
        '2 xícaras de farinha de trigo\n' +
        '1 xícara de açúcar\n' +
        '1 xícara de chocolate em pó\n' +
        '3 ovos\n' +
        '1 xícara de leite\n' +
        '1/2 xícara de óleo\n' +
        '1 colher de sopa de fermento',
      modoPreparo:
        '1. Misture os ovos, o açúcar e o óleo.\n\n' +
        '2. Acrescente a farinha, o chocolate em pó e o leite.\n\n' +
        '3. Adicione o fermento e misture delicadamente.\n\n' +
        '4. Coloque a massa em uma forma untada.\n\n' +
        '5. Asse em forno preaquecido a 180 °C por 35 a 40 minutos.'
    }
  ]);

  function limparFormulario() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
  }

  function cancelarCadastro() {
    limparFormulario();
    setFormularioVisivel(false);
  }

  function salvarReceita() {
    if (
      !nomeReceita.trim() ||
      !ingredientes.trim() ||
      !modoPreparo.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos antes de salvar.'
      );
      return;
    }

    const novaReceita = {
      id: Date.now().toString(),
      nome: nomeReceita.trim(),
      ingredientes: ingredientes.trim(),
      modoPreparo: modoPreparo.trim()
    };

    setReceitas((listaAtual) => [...listaAtual, novaReceita]);

    limparFormulario();
    setFormularioVisivel(false);

    Alert.alert(
      'Sucesso!',
      'Receita cadastrada com sucesso.'
    );
  }

  function abrirReceita(receita) {
    setReceitaSelecionada(receita);
    setVerReceitaVisivel(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 App de Receitas</Text>

      <Text style={styles.subtitle}>
        Colecione suas receitas preferidas
      </Text>

      {/* Lista de receitas na tela inicial */}
      <ScrollView
        style={styles.lista}
        contentContainerStyle={styles.listaConteudo}
        showsVerticalScrollIndicator={false}
      >
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.recipeCard}>
            <Text style={styles.cardTitle}>
              🍽️ {receita.nome}
            </Text>

            <Text style={styles.cardSubtitle}>
              Confira os ingredientes e o modo de preparo.
            </Text>

            <Button
              title="Ver Receita"
              color="#D84315"
              onPress={() => abrirReceita(receita)}
            />
          </View>
        ))}
      </ScrollView>

      {/* Modal para visualizar uma receita */}
      <Modal
        visible={verReceitaVisivel}
        animationType="slide"
        onRequestClose={() => setVerReceitaVisivel(false)}
      >
        <ScrollView
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.recipeTitle}>
            🍰 {receitaSelecionada?.nome || 'Receita'}
          </Text>

          <Text style={styles.sectionTitle}>
            📝 Ingredientes
          </Text>

          <Text style={styles.recipeText}>
            {receitaSelecionada?.ingredientes}
          </Text>

          <Text style={styles.sectionTitle}>
            👩‍🍳 Modo de Preparo
          </Text>

          <Text style={styles.recipeText}>
            {receitaSelecionada?.modoPreparo}
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Fechar Receita"
              color="#D84315"
              onPress={() => setVerReceitaVisivel(false)}
            />
          </View>
        </ScrollView>
      </Modal>

      {/* Segundo Modal: formulário de cadastro */}
      <Modal
        visible={formularioVisivel}
        animationType="slide"
        onRequestClose={cancelarCadastro}
      >
        <ScrollView
          contentContainerStyle={styles.modalContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.recipeTitle}>
            📝 Nova Receita
          </Text>

          <Text style={styles.label}>
            Nome da Receita
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex.: Lasanha de frango"
            placeholderTextColor="#8D6E63"
            value={nomeReceita}
            onChangeText={setNomeReceita}
          />

          <Text style={styles.label}>
            Ingredientes
          </Text>

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Digite os ingredientes..."
            placeholderTextColor="#8D6E63"
            value={ingredientes}
            onChangeText={setIngredientes}
            multiline={true}
            textAlignVertical="top"
          />

          <Text style={styles.label}>
            Modo de Preparo
          </Text>

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Descreva o passo a passo..."
            placeholderTextColor="#8D6E63"
            value={modoPreparo}
            onChangeText={setModoPreparo}
            multiline={true}
            textAlignVertical="top"
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Salvar Receita"
              color="#D84315"
              onPress={salvarReceita}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Cancelar"
              color="#795548"
              onPress={cancelarCadastro}
            />
          </View>
        </ScrollView>
      </Modal>

      {/* Botão flutuante para adicionar receita */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={() => setFormularioVisivel(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    paddingTop: 50,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D84315',
    marginBottom: 15,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5D4037',
    marginBottom: 25,
    textAlign: 'center'
  },
  lista: {
    flex: 1,
    width: '100%'
  },
  listaConteudo: {
    paddingBottom: 100
  },
  recipeCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#D84315',
    elevation: 3
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 8
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#795548',
    marginBottom: 12
  },
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF3E0',
    padding: 25,
    paddingTop: 40,
    paddingBottom: 40
  },
  recipeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D84315',
    textAlign: 'center',
    marginBottom: 25
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5D4037',
    marginTop: 15,
    marginBottom: 10
  },
  recipeText: {
    fontSize: 17,
    color: '#4E342E',
    lineHeight: 26,
    marginBottom: 15
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5D4037',
    marginTop: 12,
    marginBottom: 8
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7CCC8',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#4E342E'
  },
  multilineInput: {
    minHeight: 110
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 5
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D84315',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  fabText: {
    fontSize: 36,
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 40
  }
});
