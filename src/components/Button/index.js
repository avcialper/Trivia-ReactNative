import React from 'react'
import { Pressable, Text, } from 'react-native'
import styles from './styles'

export default ({ title, onPress }) => {
    return (
        <Pressable style={styles.container} onPress={() => onPress()} >
            <Text style={styles.title} >{title}</Text>
        </Pressable>
    )
}