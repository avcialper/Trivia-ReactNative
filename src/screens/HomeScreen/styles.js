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
    userContainer: {
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        margin: 16,
        borderBottomWidth: 3,
        borderRadius: 16,
        borderColor: colors.main,
    },
    username: {
        color: 'black',
        fontSize: 24,
        fontWeight: '700',
    },
    userImage: {
        width: '35%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 24,
        marginHorizontal: 8
    },
    bottomContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginVertical: 16
    },
    button: {
        width: '45%',
        height: '100%',
        backgroundColor: colors.main,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center'
    }
})