import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

// package
import Modal from 'react-native-modal'

export default ({
    visible,
    close,
    message,
    firstChoice,
    secondChoice,
    onFirstPress,
    onSecondPress
}) => {
    return (
        <Modal
            isVisible={visible}
            swipeDirection={'down'}
            animationInTiming={800}
            animationOutTiming={800}
            onBackdropPress={() => close()}
            onBackButtonPress={() => close()}
            onSwipeComplete={() => close()}
            avoidKeyboard={true}
        >
            <View style={styles.container} >
                <Text style={styles.message} >{message}</Text>
                <View style={styles.bottomContainer} >
                    <Text
                        style={styles.text}
                        onPress={() => onFirstPress()}
                    >{firstChoice}</Text>
                    <Text
                        style={styles.text}
                        onPress={() => onSecondPress()}
                    >{secondChoice}</Text>
                </View>
            </View>
        </Modal>
    )
}