import { Input, Button } from 'antd'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { TodosContext } from '../context/todosContext'

export default function TodoInput() {

  const [inputData, setInputData] = useState('')
  const getTodos = useContext(TodosContext)

  const addTask = async () => {
    if (inputData.trim()) {
      await axios.post('http://localhost:5000/addTodo', { task: inputData })
        .catch(err => console.error(err))
      getTodos()
    }
    setInputData('')
  }

  return (
    <Input.Group compact style={{ display: 'flex', margin: '10px 0' }}>
      <Input
        name='task'
        placeholder='Put your task here...'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        onPressEnter={addTask}
      />
      <Button type='primary' onClick={addTask}>Add task</Button>
    </Input.Group>
  )
}
