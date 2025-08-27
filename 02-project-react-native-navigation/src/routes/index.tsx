import { NavigationContainer } from '@react-navigation/native'
import { Navigator } from './Navigator'

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator navigatorType="drawer" />
    </NavigationContainer>
  )
}

// Inicializa o sistema de navegação, envolvendo tudo com NavigationContainer (obrigatório).