import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        marginHorizontal: 24,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        borderWidth: 3,
        borderTopWidth: 0,
        borderColor: colors.main,
        borderRadius: 8
    },
    input: {
        flex: 1,
        color: 'black',
        fontSize: 16,
        fontWeight: '700'
    },
    icon: {
        color: colors.main,
        padding: 4
    },
    bottomContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    },
    message: {
        fontSize: 16,
        color: 'red'
    }
})