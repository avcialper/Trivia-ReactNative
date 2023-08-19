import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '40%',
        resizeMode: 'cover'
    },
    icon: {
        alignSelf: 'center'
    },
    text: {
        fontSize: 64,
        fontWeight: 'bold',
        color: colors.main,
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})