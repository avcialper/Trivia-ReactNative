import React from 'react'
import { Pressable } from 'react-native'
import styles from './styles'

// package
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default ({name, backgroundColor, onPress}) => {
    return(
        <Pressable 
            style={[styles.container, {backgroundColor: backgroundColor}]}
            onPress={() => onPress()}
        >
            <Icon name={name} size={24} color={"white"} />
        </Pressable>
    )
}