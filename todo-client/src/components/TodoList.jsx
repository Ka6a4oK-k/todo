import React from 'react'
import Todos from './Todos'
import { useState, useEffect } from 'react'

export default function TodoList({ todos }) {

  const [completedTodos, setCompletedTodos] = useState([])
  const [activeTodos, setActiveTodos] = useState([])

  useEffect(() => {
    if (Array.isArray(todos)) {
      setActiveTodos(todos.filter(todo => !todo.isCompleted))
      setCompletedTodos(todos.filter(todo => todo.isCompleted))
    }
  }, [todos])

  return (
    <>
      <Todos todos={activeTodos} completed={false} />
      <Todos todos={completedTodos} completed={true} />
    </>
  )
}
