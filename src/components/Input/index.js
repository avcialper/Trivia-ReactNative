import React from 'react'
import { TextInput, View, Text } from 'react-native'
import styles from './styles'

// package
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default ({
    placeholder,
    text,
    setText,
    primaryIcon,
    secondaryIcon,
    isSecure = false,
    changableIcon = false,
    keyboardType = 'default',
    errorMessage = ""
}) => {

    const [secure, setSecure] = React.useState(isSecure)
    const [icon, setIcon] = React.useState(primaryIcon)

    // If the icons can change, they change when u press the icon
    const changeIcon = () => {
        if (changableIcon) {
            if (icon === secondaryIcon) {
                setIcon(primaryIcon)
                setSecure(true)
            } else {
                setIcon(secondaryIcon)
                setSecure(false)
            }
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.innerContainer} >
                <TextInput
                    style={styles.input}
                    value={text}
                    autoCapitalize='none'
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    onChangeText={setText}
                    placeholderTextColor={'grey'}
                    secureTextEntry={secure}
                />
                <Icon
                    style={styles.icon}
                    name={icon}
                    onPress={changeIcon}
                    size={32}
                />
            </View>
            <View style={styles.bottomContainer} >
                <Icon name={errorMessage === "" ? null : 'alert-box'} size={16} color={'red'} />
                <Text style={styles.message} >{errorMessage}</Text>
            </View>
        </View>
    )
}