import React, { useState, useContext } from 'react'
import { Table, Checkbox, Button, Modal, Input } from 'antd'
import axios from 'axios'
import { TodosContext } from '../context/todosContext'

export default function ActiveTodos({ todos, completed }) {

    const [openModal, setOpenModal] = useState(false)
    const [inputData, setInputData] = useState('')
    const [modalId, setModalId] = useState('')
    const getTodos = useContext(TodosContext)

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/deleteTodo/${id}`)
            .catch(err => console.error(err))
        getTodos()
    }

    const editTask = async (id) => {
        if (inputData.trim().length !== 0) {
            await axios.put(`http://localhost:5000/editTodo/${id}`, { task: inputData })
                .catch(err => console.error(err))
            setOpenModal(false)
            setInputData('')
            getTodos()
        }
    }

    const toggleTask = async (id) => {
        await axios.put(`http://localhost:5000/toggleTodo/${id}`)
            .catch(err => console.error(err))
        getTodos()
    }

    const columns = [
        {
            width: '5%',
            render: (_, record) =>
                <Checkbox
                    checked={record.isCompleted}
                    onChange={() => toggleTask(record._id)}
                >
                </Checkbox>
        },
        {
            title: 'Tasks',
            dataIndex: 'task',
            key: 'task',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '170px',
            render: (_, record) => (
                <>
                    <Button type='primary' onClick={() => { setOpenModal(true); setModalId(record._id) }}>Edit</Button>
                    <Modal
                        title="Edit todo"
                        centered
                        open={openModal}
                        onOk={() => editTask(modalId)}
                        onCancel={() => { setOpenModal(false); setInputData('') }}
                        padding='8px'
                        okText="Save"
                        cancelText="Cancel"
                    >
                        <Input
                            placeholder='Put new task here...'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            onPressEnter={() => editTask(modalId)}
                        />
                    </Modal>
                    <Button type='primary' danger onClick={() => deleteTask(record._id)}>Delete</Button>
                </>
            )
        }
    ]

    return (
        <div style={{ marginTop: '20px' }}>
            {completed ? <h1>Completed Tasks ({todos.length})</h1> : <h1>Active Tasks ({todos.length})</h1>}
            <Table columns={columns} dataSource={todos} pagination={false} />
        </div>
    )
}
