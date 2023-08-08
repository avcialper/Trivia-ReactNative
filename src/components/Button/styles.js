import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        backgroundColor: colors.main,
        padding: 8,
        marginHorizontal: 24,
        borderRadius: 8,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center'
    }
})