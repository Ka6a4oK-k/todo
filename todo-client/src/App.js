import { Layout } from 'antd'
import { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { TodosContext } from './context/todosContext';
import axios from 'axios';
import './styles/basic.css'

const { Header, Content } = Layout

function App() {
  const [todos, setTodos] = useState([])

  const getTodos = async () => {
    await axios.get('http://localhost:5000/getTodos')
      .then(res => res.data)
      .then(data => data.map(todo => {todo.key = todo._id; return todo}))
      .then(todos => setTodos(todos))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" style={{ color: 'white' }}>
          Tasks
        </div>
      </Header>
      <Content
        style={{ padding: '15px 30px', }}
      >
        <TodosContext.Provider value={getTodos}>
          <TodoInput />
          <TodoList todos={todos} />
        </TodosContext.Provider>
      </Content>
    </Layout>
  );
}

export default App;