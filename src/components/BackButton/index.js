import React from 'react'
import { Pressable } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import colors from '../../utils/colors'

export default ({ pageName }) => {

    const navigation = useNavigation()

    const handleNavigation = () => navigation.navigate(pageName)

    return (
        <Pressable style={styles.container} onPress={() => handleNavigation()}>
            <Icon name='arrow-left-bold-box-outline' size={48} color={colors.main} />
        </Pressable>
    )
}