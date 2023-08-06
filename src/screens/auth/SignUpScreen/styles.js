import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '40%',
        resizeMode: 'contain'
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16
    },
    signInText: {
        color: 'black',
        fontSize: 16
    }
})