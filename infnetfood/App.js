import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import axios from 'axios';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [logado, setLogado] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [temaEscuro, setTemaEscuro] = useState(true);

  const tema = temaEscuro ? temaEscuroEstilo : temaClaroEstilo;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!logado ? (
          <Stack.Screen name="Login">
            {(props) => (
              <Login
                {...props}
                setLogado={setLogado}
                tema={tema}
                setTemaEscuro={setTemaEscuro}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} tema={tema} />}
            </Stack.Screen>

            <Stack.Screen name="Produtos">
              {(props) => <Produtos {...props} tema={tema} />}
            </Stack.Screen>

            <Stack.Screen name="Detalhe">
              {(props) => (
                <Detalhe
                  {...props}
                  tema={tema}
                  carrinho={carrinho}
                  setCarrinho={setCarrinho}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Carrinho">
              {(props) => (
                <Carrinho
                  {...props}
                  tema={tema}
                  carrinho={carrinho}
                  setCarrinho={setCarrinho}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Checkout">
              {(props) => (
                <Checkout
                  {...props}
                  tema={tema}
                  carrinho={carrinho}
                  setCarrinho={setCarrinho}
                  pedidos={pedidos}
                  setPedidos={setPedidos}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Perfil">
              {(props) => <Perfil {...props} tema={tema} />}
            </Stack.Screen>

            <Stack.Screen name="Pedidos">
              {(props) => <Pedidos {...props} tema={tema} pedidos={pedidos} />}
            </Stack.Screen>

            <Stack.Screen name="Restaurantes">
              {(props) => <Restaurantes {...props} tema={tema} />}
            </Stack.Screen>

            <Stack.Screen name="RestauranteDetalhe">
              {(props) => <RestauranteDetalhe {...props} tema={tema} />}
            </Stack.Screen>

            <Stack.Screen name="Mapa">
              {(props) => <Mapa {...props} tema={tema} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Login({ setLogado, tema, setTemaEscuro }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha os campos');
      return;
    }
    setLogado(true);
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>InfnetFood</Text>

      <TextInput
        placeholder="Email"
        style={[
          styles.input,
          { backgroundColor: tema.input, color: tema.texto },
        ]}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={[
          styles.input,
          { backgroundColor: tema.input, color: tema.texto },
        ]}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: tema.botao }]}
        onPress={entrar}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setTemaEscuro((prev) => !prev)}>
        <Text style={{ color: tema.texto }}>Trocar Tema</Text>
      </TouchableOpacity>
    </View>
  );
}

function Home({ navigation, tema }) {
  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.texto }]}>Menu</Text>

      {[
        'Produtos',
        'Carrinho',
        'Perfil',
        'Pedidos',
        'Restaurantes',
        'Mapa',
      ].map((tela) => (
        <TouchableOpacity
          key={tela}
          style={[styles.botao, { backgroundColor: tema.botao }]}
          onPress={() => navigation.navigate(tela)}>
          <Text style={styles.textoBotao}>{tela}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}


function Produtos({ navigation, tema }) {
  const produtos = [
    { id: '1', nome: 'Hamburguer', preco: 20 },
    { id: '2', nome: 'Pizza', preco: 30 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: tema.card }]}
            onPress={() => navigation.navigate('Detalhe', { produto: item })}>
            <Text style={{ color: tema.texto }}>
              {item.nome} - R$ {item.preco}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function Detalhe({ route, carrinho, setCarrinho, tema }) {
  const { produto } = route.params;
  const [qtd, setQtd] = useState(1);

  function adicionar() {
    const existente = carrinho.find((i) => i.id === produto.id);

    if (existente) {
      const novoCarrinho = carrinho.map((i) =>
        i.id === produto.id ? { ...i, qtd: i.qtd + qtd } : i
      );
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { ...produto, qtd }]);
    }

    Alert.alert("✅ Adicionado ao carrinho");
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={{ color: tema.texto, fontSize: 20 }}>{produto.nome}</Text>

      
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <TouchableOpacity
          style={[styles.botao, { flex: 1, backgroundColor: tema.botao }]}
          onPress={() => setQtd(Math.max(1, qtd - 1))}
        >
          <Text style={styles.textoBotao}>-</Text>
        </TouchableOpacity>

        <Text style={{ color: tema.texto, marginHorizontal: 15, fontSize: 18 }}>
          {qtd}
        </Text>

        <TouchableOpacity
          style={[styles.botao, { flex: 1, backgroundColor: tema.botao }]}
          onPress={() => setQtd(qtd + 1)}
        >
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: tema.botao }]}
        onPress={adicionar}
      >
        <Text style={styles.textoBotao}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}
//

function Carrinho({ navigation, carrinho, setCarrinho, tema }) {
  function remover(id) {
    const novo = carrinho.filter((item) => item.id !== id);
    setCarrinho(novo);
  }

  function aumentar(id) {
    const novo = carrinho.map((item) =>
      item.id === id ? { ...item, qtd: item.qtd + 1 } : item
    );
    setCarrinho(novo);
  }

  function diminuir(id) {
    const novo = carrinho
      .map((item) =>
        item.id === id ? { ...item, qtd: item.qtd - 1 } : item
      )
      .filter((item) => item.qtd > 0);

    setCarrinho(novo);
  }

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.qtd,
    0
  );

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: tema.card }]}>
            <Text style={{ color: tema.texto }}>
              {item.nome} - R$ {item.preco}
            </Text>

            
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <TouchableOpacity onPress={() => diminuir(item.id)}>
                <Text style={{ color: tema.texto, fontSize: 18 }}>➖</Text>
              </TouchableOpacity>

              <Text style={{ color: tema.texto, marginHorizontal: 10 }}>
                {item.qtd}
              </Text>

              <TouchableOpacity onPress={() => aumentar(item.id)}>
                <Text style={{ color: tema.texto, fontSize: 18 }}>➕</Text>
              </TouchableOpacity>
            </View>

            
            <TouchableOpacity onPress={() => remover(item.id)}>
              <Text style={{ color: "red" }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={{ color: tema.texto, fontSize: 18 }}>
        Total: R$ {total}
      </Text>

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: tema.botao }]}
        onPress={() => navigation.navigate("Checkout")}
      >
        <Text style={styles.textoBotao}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Dando problema
function Checkout({ carrinho, setCarrinho, pedidos, setPedidos, tema }) {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  async function buscarCep() {
    if (!cep) return Alert.alert('Erro', 'Digite o CEP');

    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    setEndereco(res.data.logradouro);
  }

  function finalizar() {
    if (!endereco) return Alert.alert('Erro', 'Preencha endereço');

    setPedidos([...pedidos, { id: Date.now(), itens: carrinho }]);
    setCarrinho([]);

    Alert.alert('🎉 Pedido confirmado!');
  }
// 
  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <TextInput
        placeholder="CEP"
        style={[
          styles.input,
          { backgroundColor: tema.input, color: tema.texto },
        ]}
        onChangeText={setCep}
      />

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: tema.botao }]}
        onPress={buscarCep}>
        <Text style={styles.textoBotao}>Buscar CEP</Text>
      </TouchableOpacity>

      <TextInput
        value={endereco}
        style={[
          styles.input,
          { backgroundColor: tema.input, color: tema.texto },
        ]}
      />

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: tema.botao }]}
        onPress={finalizar}>
        <Text style={styles.textoBotao}>Confirmar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

function Perfil({ tema }) {
  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={{ color: tema.texto }}>Nome: Viccenzo</Text>
      <Text style={{ color: tema.texto }}>Email: teste@email.com</Text>
    </View>
  );
}


function Pedidos({ pedidos, tema }) {
  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <FlatList
        data={pedidos}
        renderItem={({ item }) => (
          <Text style={{ color: tema.texto }}>Pedido #{item.id}</Text>
        )}
      />
    </View>
  );
}

function Restaurantes({ navigation, tema }) {
  const lista = [{ id: 1, nome: 'Restaurante A' }];

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <FlatList
        data={lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('RestauranteDetalhe', { item })}>
            <Text style={{ color: tema.texto }}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function RestauranteDetalhe({ route, tema }) {
  const { item } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={{ color: tema.texto }}>{item.nome}</Text>
      <Text style={{ color: tema.texto }}>Endereço: Centro RJ</Text>
      <Text style={{ color: tema.texto }}>Prato: Pizza</Text>
    </View>
  );
}

function Mapa() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://maps.google.com')}>
        <Text>Abrir Mapa</Text>
      </TouchableOpacity>
    </View>
  );
}


const temaEscuroEstilo = {
  fundo: '#121212',
  texto: '#fff',
  card: '#1e1e1e',
  input: '#2a2a2a',
  botao: '#ff3c00',
};

const temaClaroEstilo = {
  fundo: '#fff',
  texto: '#000',
  card: '#eee',
  input: '#fff',
  botao: '#ff3c00',
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24 },
  input: { padding: 10, margin: 10, borderRadius: 10 },
  botao: { padding: 12, borderRadius: 10, marginVertical: 5 },
  textoBotao: { color: '#fff', textAlign: 'center' },
  card: { padding: 15, borderRadius: 10, marginVertical: 5 },
});
