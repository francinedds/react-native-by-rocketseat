import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Por padrão o react native é "col", ou seja, coloca os itens um embaixo do outro
    alignItems: 'center',
    gap: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 600,
  }
})