import React from 'react'
import { Pressable, Text } from 'react-native'
import styles from './styles'
import colors from '../../utils/colors'

export default ({ title, topLeftRadius = 0, topRightRadius = 0, bottomRightRadius = 0, bottomLeftRadius = 0, isSelected, onPress, selectable = true }) => {
    return (
        <Pressable
            style={[
                styles.container,
                {
                    borderTopLeftRadius: topLeftRadius,
                    borderTopRightRadius: topRightRadius,
                    borderBottomRightRadius: bottomRightRadius,
                    borderBottomLeftRadius: bottomLeftRadius
                },
                isSelected && { backgroundColor: colors.main }
            ]}
            onPress={() => onPress()}
        >
            <Text style={[styles.title, isSelected && { color: 'white' }, !selectable && { color: 'grey' }]} >{title}</Text>
        </Pressable>
    )
}