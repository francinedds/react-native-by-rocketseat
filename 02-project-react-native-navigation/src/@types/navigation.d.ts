export type RootStackParamList = {
    home: undefined
    product: undefined
  }
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }



  
// Arquivo que permite que as ferramentas do React Navigation (como useNavigation() e useRoute()) saibam exatamente quais parâmetros são esperados por cada rota com base no seu tipo RootStackParamList.
// Isso significa:
// A rota chamada home não espera nenhum parâmetro (undefined)
// A rota chamada product também não espera parâmetros

