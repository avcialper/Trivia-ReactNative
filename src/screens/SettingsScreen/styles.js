import { StyleSheet } from 'react-native'
import colors from '../../utils/colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 16
    },
    imageContainer: {
        marginTop: 16,
        height: '20%',
        alignItems: 'center',
        marginBottom: 64
    },
    image: {
        width: '40%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 24
    },
    camera: {
        position: 'absolute',
        right: '30%',
        bottom: 0,
        backgroundColor: colors.main,
        padding: 8,
        borderBottomRightRadius: 24,
        borderTopLeftRadius: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    email: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.main,
        marginBottom: 8,
        textAlign: 'center',
        marginTop: -5
    },
    updateContainer: {
        borderWidth: 2,
        borderColor: colors.main,
        marginHorizontal: 20,
        marginBottom: 16,
        paddingBottom: 16,
        borderRadius: 16
    },
    updateTitle: {
        textAlign: 'center',
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        color: 'white',
        fontWeight: '700',
        backgroundColor: colors.main,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    logOut: {
        position: 'absolute',
        right: 16,
        top: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '10%',
        height: '5%',
        borderRadius: 8,
        backgroundColor: colors.main
    }
})