import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import styles from './styles'

// components
import Button from '../../components/Button'
import useStore from '../../useStore'

export default ({ navigation }) => {

    const user = useStore((state) => state.user)
    
    return (
        <View style={styles.container} >
            <Image source={require("../../assets/triviaRemovedBG.png")} style={styles.image} />
            <View style={styles.userContainer} >
                <Image
                    source={user && user.photoURL ?
                        { uri: user.photoURL } :
                        require("../../assets/user.jpg")}
                    style={styles.userImage}
                />
                <Text style={styles.username} >{user ? user.displayName : ""}</Text>
            </View>
            <View style={styles.bottomContainer} >
                <Pressable style={styles.button} onPress={() => navigation.navigate("TestSettings")}>
                    <Text style={styles.buttonTitle} >Start Challange</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate("Leaderboard")} >
                    <Text style={styles.buttonTitle} >Leaderboard</Text>
                </Pressable>
            </View>
            <Button title={"Settings"} onPress={() => navigation.navigate("Settings")} />
        </View>
    )
}