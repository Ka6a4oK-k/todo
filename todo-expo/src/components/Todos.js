import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TodoCard from './TodoCard'

export default function Todos({todos, isCompleted}) {
  return (
    <View style={style.todosWrapper}>
        <Text style={style.text}>{isCompleted ? `Completed tasks` : `Active tasks`} ({todos.length})</Text>
        {todos.map((todo, index) => <TodoCard todo={todo} key={index}/>)}
    </View>
  )
}

const style = StyleSheet.create({
    todosWrapper: {
        // width: '100%'
    },
    text: {
      fontSize: 18
    }
})
