import auth from '@react-native-firebase/auth'
import { errorMessage } from './authErrors'
import { showMessage } from 'react-native-flash-message'
import colors from './colors'
import { Keyboard } from 'react-native'

export const signIn = (values, setUser) => {
    const { email, password } = values
    Keyboard.dismiss()
    auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            showMessage({
                message: "Login succesful.",
                type: 'default',
                backgroundColor: colors.main,
                color: 'white'
            })
            setUser(data.user)
        })
        .catch((error) => showMessage({
            message: errorMessage(error.code),
            type: 'default',
            backgroundColor: colors.main,
            color: 'white'
        }))
}

export const signUp = (values, setUser) => {
    const { email, password } = values
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            showMessage({
                message: "Account created.",
                type: 'default',
                backgroundColor: colors.main,
                color: 'white'
            })
            setUser(data.user)
        })
        .catch((error) => showMessage({
            message: errorMessage(error.code),
            type: 'default',
            backgroundColor: colors.main,
            color: 'white'
        }))
}

export const signOut = (setUser) => {
    auth()
        .signOut()
        .then(() => {
            showMessage({
                message: "Sign out.",
                type: 'default',
                backgroundColor: colors.main,
                color: 'white'
            })
            setUser(null)
        })
        .catch((error) => showMessage({
            message: errorMessage(error.code),
            type: 'default',
            backgroundColor: colors.main,
            color: 'white'
        }))
}