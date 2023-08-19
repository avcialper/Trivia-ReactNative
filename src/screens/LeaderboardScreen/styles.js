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
    innerContainer: {
        marginHorizontal: 24,
        borderWidth: 2,
        borderColor: colors.main,
        borderRadius: 16,
        height: '50%'
    },
    title: {
        backgroundColor: colors.main,
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        padding: 8,
        textAlign: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    sperator: {
        height: 0.5,
        marginHorizontal: 8,
        backgroundColor: colors.main
    }
})