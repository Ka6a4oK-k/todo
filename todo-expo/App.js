// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import TodoInput from './src/components/TodoInput';
import TodoList from './src/components/TodoList';
import { TodosContext } from './src/context/todosContext'
import axios from 'axios'

export default function App() {
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    await axios.get('http://10.0.2.2:5000/getTodos')
      .then(res => res.data)
      .then(data => data.map(todo => { todo.key = todo._id; return todo }))
      .then(todos => setTodos(todos))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      <TodosContext.Provider value={getTodos}>
        <TodoInput />
        <TodoList todos={todos} />
      </TodosContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
