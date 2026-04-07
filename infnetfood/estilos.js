import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F6FA",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#2D8CFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  preco: {
    color: "red",
    fontWeight: "bold",
  },
});