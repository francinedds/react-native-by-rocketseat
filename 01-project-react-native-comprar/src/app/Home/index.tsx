import { useState, useEffect } from 'react';

import { View, Image, Text, TouchableOpacity, FlatList, Alert } from 'react-native';

import { Button } from '@/components/Button';
import { Filter } from '@/components/Filter';
import { Input } from '@/components/Input';
import { Item } from '@/components/Item';

import { FilterStatus } from '@/@types/FilterStatus';
import { itemsStorage, ItemsStorage } from '@/storage/itemsStorage';

import { styles } from './styles'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemsStorage[]>([])

  async function handleAdd() {
    if (!description.trim()) { // Trim ignora espaços caso o usuário digite sem querer
      return Alert.alert("Adicionar", "Informe a descrição para adicionar.")
    }

    const newItem = {
      id: Math.random().toString().substring(2), // Gera id aleatório
      description,
      status: FilterStatus.PENDING,
    }

    await itemsStorage.add(newItem)
    await itemsByStatus()

    Alert.alert("Adicionado", `Adicionado ${description}`)
    setDescription("") // Input volta a ficar vazio.
    setFilter(FilterStatus.PENDING) // Status volta para pendente.
  }
  
  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter) // Acessa dados salvos localmente em itemsStorage.
      setItems(response) // O resultado (response) é passado para setItems, que atualiza o estado dos itens na interface.
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert("Remover", "Não foi possível remover o item.")
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => onClear()} // Cai na função abaixo:
    ])
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert("Limpar", "Não foi possível remover todos os itens.")
    }
  }

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id)
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }


  useEffect(() => { // O hook irá executar itemsByStatus (apenas uma vez quando renderizar a página).
    itemsByStatus()
  }, [filter]) // Renderiza ao clicar nos filtros também.

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo} /> 
      
      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" onChangeText={setDescription} value={description} />
        <Button title='Adicionar' onPress={handleAdd}/>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
        {FILTER_STATUS.map((status) => (
          <Filter
            key={status}
            status={status} 
            isActive={filter === status}
            onPress={() => setFilter(status)} 
        />
        ))}

        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
        </View>


        <FlatList 
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item} 
              onStatus={() => handleToggleItemStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} /> }
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
        />
      </View>
    </View>
  );
}


