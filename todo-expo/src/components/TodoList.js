import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import Todos from './Todos'

export default function TodoList({todos}) {

    const [completedTodos, setCompletedTodos] = useState([])
    const [activeTodos, setActiveTodos] = useState([])

    useEffect(() => {
        if (Array.isArray(todos)) {
          setActiveTodos(todos.filter(todo => !todo.isCompleted))
          setCompletedTodos(todos.filter(todo => todo.isCompleted))
        }
      }, [todos])

  return (
    <View style={style.wrapper}>
      <ScrollView>
        <Todos todos={activeTodos} isCompleted={false} />
        <Todos todos={completedTodos} isCompleted={true} />
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 5,
  }
})
