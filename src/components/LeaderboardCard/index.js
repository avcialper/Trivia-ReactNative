import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

export default ({ username, image, point, index, currentUserIndex }) => {
    return (
        <View style={[styles.container, index === currentUserIndex && { backgroundColor: 'rgba(68, 0, 101, 0.9)', borderRadius: 4 }]} >
            <View style={styles.innerContainer} >
                <Text style={[styles.text, { flex: 0.8 }, index === currentUserIndex && { color: 'white' }]} >{index + 1}- {username}</Text>
                <Text style={[styles.text, { textAlign: 'center' }, index === currentUserIndex && { color: 'white' }]} >{point}</Text>
            </View>
            <Image source={image ? { uri: image } : require("../../assets/user.jpg")} style={styles.image} />
        </View>
    )
}