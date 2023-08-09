import React from 'react'
import { Image} from 'react-native'

export default () => {
    return (
        <Image 
            source={require("../../assets/triviaRemovedBG.png")}
            style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain'
            }}
        />
    )
}