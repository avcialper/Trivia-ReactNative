import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '15%',
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors.background
    },
    message: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        marginBottom: 16
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        textAlign: 'center',
        width: '40%',
        padding: 4,
        fontSize: 16,
        fontWeight: '700',
        color: colors.main
    }
})