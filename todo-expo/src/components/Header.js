import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Todo App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 70,
        paddingBottom: 5,
        backgroundColor: '#555',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
})
