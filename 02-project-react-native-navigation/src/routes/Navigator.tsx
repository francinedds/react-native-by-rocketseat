import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Home } from '@/app/Home'
import { Product } from '@/app/Product'

import { MaterialIcons } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

export function Navigator({ navigatorType }: { navigatorType: 'stack' | 'tab' | 'drawer' }) {
  if (navigatorType === 'stack') {
    return (
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="product" component={Product} />
      </Stack.Navigator>
    )
  }

  if (navigatorType === 'tab') {
    return (
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarLabel: "Produto",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="product"
          component={Product}
          options={{
            tabBarLabel: "Produto",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="add-circle" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  if (navigatorType === 'drawer') {
    return (
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#2C46B1",
          drawerInactiveTintColor: "#444444",
        }}
      >
        <Drawer.Screen
          name="home"
          component={Home}
          options={{
            drawerLabel: "Ínicio",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="product"
          component={Product}
          options={{
            drawerLabel: "Configurações",
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }

  return null
}

// Define as rotas da stack (quais telas existem e como navegar entre elas).

// Além disso, neste arquivo foram definidos quais os TIPOS de NAVEGAÇÃO podemos usar stack/tab/drawer.
// Deixei todas juntas para melhor visualização dos três tipos, mas basta escolher o melhor tipo para o projeto.
