import React from 'react'
import { Pressable, Text } from 'react-native'
import styles from './styles'

export default ({ text, onPress, isTrue = false, isFalse = false, isSelected = false, disabled }) => {
    return (
        <Pressable
            style={[
                styles.container,
                isTrue && { borderColor: 'green' },
                isFalse && { borderColor: 'red' },
                isSelected && { borderColor: '#a1751f' }
            ]}
            onPress={() => onPress()}
            disabled={disabled}
        >
            <Text style={styles.title} >{text}</Text>
        </Pressable>
    )
}