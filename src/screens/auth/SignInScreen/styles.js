import { StyleSheet } from 'react-native'
import colors from '../../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '40%',
        resizeMode: 'contain'
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16
    },
    signUpText: {
        color: 'black',
        fontSize: 16
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    modalContainer: {
        width: '100%',
        height: '30%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: colors.background,
        justifyContent: 'center'
    },
    forgotText: {
        color: '#1B7CD6',
        fontSize: 16,
        textAlign: 'center'
    }
})