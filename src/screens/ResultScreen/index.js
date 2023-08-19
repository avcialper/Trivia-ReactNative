import React, { useEffect } from 'react'
import { View, Text, Image, BackHandler } from 'react-native'
import styles from './styles'

// components
import Button from '../../components/Button'

export default ({ navigation, route }) => {

    const { point } = route?.params

    useEffect(() => {
        const backAction = () => {
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        )

        return () => backHandler.remove()
    }, [])

    return (
        <View style={styles.container} >
            <Image source={require('../../assets/triviaRemovedBG.png')} style={styles.image} />
            <Image source={require('../../assets/crownBig.png')} style={styles.icon} />
            <Text style={styles.text} >{point}</Text>
            <View style={styles.buttonContainer} >
                <Button
                    title={"Menu"}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }]
                    })}
                />
            </View>
        </View>
    )
}