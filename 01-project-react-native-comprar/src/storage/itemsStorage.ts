import AsyncStorage from "@react-native-async-storage/async-storage"
import { FilterStatus } from "@/@types/FilterStatus"

const ITEMS_STORAGE_KEY = "@comprar:items" // Isso define a chave usada pra guardar os dados. O AsyncStorage é tipo uma gaveta com etiquetas — a etiqueta é essa string "@comprar:items".

export type ItemsStorage = { // Isso define como cada "item" vai ser salvo.
  id: string
  status: FilterStatus
  description: string
}

// Tenta pegar o conteúdo salvo naquela chave.
async function get(): Promise<ItemsStorage[]> { 
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

    return storage ? JSON.parse(storage) : [] // Se achar algo, ele transforma de STRING pra OBJETO com JSON.parse(...). Se não tiver nada salvo ainda, ele retorna um array vazio.
  } catch (error) {
    throw new Error("GET_ITEMS: " + error) // Se der erro, lança uma mensagem de erro personalizada.
  }
}

// Retorna itens filtrados com base no status
async function getByStatus(status: FilterStatus): Promise<ItemsStorage[]> { 
    const items = await get()
    return items.filter((item) => item.status === status)
  }

// Salvar no armazenamento local 
async function save(items: ItemsStorage[]): Promise<void> { 
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    throw new Error("ITEMS_SAVE: " + error)
  }
}

// Adicionar esse item novo à lista já existente e salvar a nova lista.
async function add(newItem: ItemsStorage): Promise<ItemsStorage[]> { 
  const items = await get()
  const updatedItems = [...items, newItem] // Pega os itens anteriores e adiciona o novo.
  await save(updatedItems)
  
  return updatedItems
}

// Remover itens da lista baseado no id
async function remove(id: string): Promise<void> {
  const items = await get()
  const updatedItems = items.filter((item) => item.id !== id)
  await save(updatedItems)
}

// Limpar a lista toda
async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
  } catch (error) {
    throw new Error("ITEMS_CLEAR: " + error)
  }
}

// Muda o item de acordo com o estado (pending ou done)
async function toggleStatus(id: string): Promise<void> {
  const items = await get()

  const updatedItems = items.map((item) => 
    item.id === id
    ? {
      ...item,
      status: item.status === FilterStatus.PENDING
        ? FilterStatus.DONE
       : FilterStatus.PENDING,
    }
    : item
  )

  await save(updatedItems)
}

// Exporta todos os métodos que serão usados na "home"
export const itemsStorage = { 
  get, 
  getByStatus, 
  add, 
  remove,
  clear,
  toggleStatus,
}



// EXPLICAÇÃO:
// O AsyncStorage é como um armazenamento local no React Native. Ele permite salvar dados no celular do usuário, mesmo que o app seja fechado ou reiniciado.
// Pense nele como um mini banco de dados chave-valor

