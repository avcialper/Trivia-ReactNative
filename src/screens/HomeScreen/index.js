import React from 'react'
import { View, Text } from 'react-native'

import Button from '../../components/Button'
import auth from "@react-native-firebase/auth"

export default ({navigation}) => {
    
    return(
        <View>
            <Text>Home</Text>
            <Button onPress={() => auth().signOut().then(() => navigation.navigate("SignIn"))} />
        </View>
    )
}