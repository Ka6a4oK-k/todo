import React, { useState, useContext } from 'react'
import { TodosContext } from '../context/todosContext'
import { View, StyleSheet, TextInput, Pressable, Text, Keyboard } from 'react-native'
import axios from 'axios'

export default function TodoInput() {

    const [inputData, setInputData] = useState('')
    const getTodos = useContext(TodosContext)

    const addTask = async () => {
        if (inputData.trim()) {
            await axios.post('http://10.0.2.2:5000/addTodo', {task: inputData})
                .catch(err => console.error(err))
            getTodos()
        }
        setInputData('')
    }

    return (
        <View style={style.wrapper}>
            <TextInput
                placeholder='Put task here...'
                style={style.input}
                value={inputData}
                onChangeText={setInputData}
                onSubmitEditing={addTask}
                autoCorrect={false}
            />
            <Pressable style={style.button} onPress={() => { addTask(); Keyboard.dismiss() }}>
                <Text style={style.buttonText}>
                    ADD
                </Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    input: {
        borderStyle: 'solid',
        borderBottomWidth: 2,
        width: '70%',
    },
    button: {
        width: '25%',
        borderRadius: 10,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    buttonText: {
        color: 'white'
    }
})
