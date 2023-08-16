import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '40%',
        resizeMode: 'contain'
    },
    question: {
        backgroundColor: colors.main,
        height: '15%',
        marginHorizontal: 24,
        borderRadius: 16,
        padding: 8,
    },
    category: {
        color: '#40E0D0',
        fontWeight: '500',
        paddingBottom: 4
    },
    questionText: {
        color: 'whitesmoke',
        fontWeight: '500',
        fontSize: 16
    },
    point: {
        position: 'absolute',
        flexDirection: 'row',
        left: 0,
        marginLeft: 24,
        top: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '20%'
    },
    timer: {
        position: 'absolute',
        flexDirection: 'row',
        right: 0,
        marginRight: 24,
        top: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '20%'
    },
    countText: {
        fontSize: 36,
        color: colors.main,
        fontWeight: 'bold'
    }
})