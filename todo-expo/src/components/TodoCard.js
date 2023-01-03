import React, { useContext, useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { Avatar, Checkbox } from 'react-native-paper'
import { TodosContext } from '../context/todosContext'
import axios from 'axios'

export default function TodoCard({ todo }) {

    const [modalVisible, setModalVisible] = useState(false)
    const [inputData, setInputData] = useState('')
    const getTodos = useContext(TodosContext)

    const deleteTask = async () => {
        await axios.delete(`http://10.0.2.2:5000/deleteTodo/${todo._id}`)
            .catch(err => console.error(err))
        getTodos()
    }

    const editTask = async () => {
        if (inputData.trim()) {
            await axios.put(`http://10.0.2.2:5000/editTodo/${todo._id}`, { task: inputData })
                .catch(err => console.error(err))
            getTodos()
        }
    }

    const toggleTask = async () => {
        await axios.put(`http://10.0.2.2:5000/toggleTodo/${todo._id}`)
            .catch(err => console.error(err))
        getTodos()
    }

    const closeModal = () => {
        setInputData('')
        setModalVisible(false)
    }

    const saveEditedTask = () => {
        setInputData('')
        setModalVisible(false)
        editTask()
    }

    return (
        <View style={style.todoCard}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={style.modal}>
                    <View style={style.modalBlock}>
                        <Text style={style.modalTitle}>Task Edit</Text>
                        <TextInput
                            placeholder='Put new task here...'
                            style={style.modalInput}
                            autoCorrect={false}
                            onSubmitEditing = {saveEditedTask}
                            onChangeText= {text => setInputData(text)}
                        />
                        <View style={style.modalButtonsWrapper}>
                            <Pressable
                                style={[style.modalButton, {backgroundColor:'red'}]}
                                onPress={closeModal}
                            >
                                <Text style={style.modalButtonText}>Close</Text>
                            </Pressable>
                            <Pressable
                                style={[style.modalButton, {backgroundColor:'blue'}]}
                                onPress={saveEditedTask}
                            >
                                <Text style={style.modalButtonText}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>
            <View style={style.taskWrapper}>
                <Checkbox
                    status={todo.isCompleted ? 'checked' : 'unchecked'}
                    onPress={toggleTask}
                />
                <View style={{ flex: 0.95 }}>
                    <Text style={style.text}>{todo.task}</Text>
                </View>
            </View>
            <View style={style.buttonsWrapper}>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Avatar.Icon size={26} icon='tooltip-edit' />
                </Pressable>
                <Pressable onPress={deleteTask}>
                    <Avatar.Icon size={26} icon='delete' />
                </Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    todoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 3,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3
    },
    buttonsWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 6,
        width: 56,
    },
    taskWrapper: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16
    },
    modal: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    modalBlock: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20
    },
    modalTitle: {
        fontSize: 18
    },
    modalInput: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        width: '90%',
    },
    modalButtonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    },
    modalButton: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize:16
    }
})
