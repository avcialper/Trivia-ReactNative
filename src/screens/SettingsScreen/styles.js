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
    imageButton: {
        backgroundColor: colors.main,
        padding: 8,
        margin: 16,
        borderRadius: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: '45%',
        padding: 16,
        backgroundColor: colors.main,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: 'white'
    },
    buttonTitle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: 'white'
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
    modalContainer: {
        width: '100%',
        height: '15%',
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors.background
    },
    modalText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500',
        marginBottom: 16
    },
    answerArea: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    answerText: {
        textAlign: 'center',
        width: '40%',
        padding: 4,
        fontSize: 16,
        fontWeight: '700',
        color: colors.main
    }
})