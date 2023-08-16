import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        marginHorizontal: 24,
        marginVertical: 8,
        padding: 16,
        borderRadius: 16,
        borderWidth: 4,
        borderColor: colors.main
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    }
})