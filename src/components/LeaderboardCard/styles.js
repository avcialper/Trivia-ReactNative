import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        paddingTop: 4,
        paddingBottom: 4,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        padding: 8
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500'
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 8
    }
})