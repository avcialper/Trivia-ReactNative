import { Keyboard } from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { errorMessage } from './authErrors'
import { message } from '../utils/functions'

export const signIn = (values, setUser, resetForm, initialValues) => {
    const { email, password } = values
    Keyboard.dismiss()

    auth().signInWithEmailAndPassword(email, password)
        .then((data) => {
            message("Login succesful.")
            resetForm({ values: initialValues })
            setUser(data?.user)
        })
        .catch((error) =>
            message(errorMessage(error.code))
        )
}

export const signUp = (values, setUser, navigation, resetForm, initialValues) => {
    const { email, password } = values

    auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
            message("Account created.")
            resetForm({ values: initialValues })
            setUser(data?.user)
            navigation.navigate("Settings")
        })
        .catch((error) =>
            message(errorMessage(error.code))
        )
}

export const signOut = (setUser, navigation) => {
    auth()
        .signOut()
        .then(() => {
            message("Sing out.")
            setUser(null)
            navigation.reset({
                index: 0,
                routes: [{ name: "Auth" }]
            })
        })
        .catch((error) =>
            message(errorMessage(error.code))
        )
}

export const updateUsernameAndImage = async (displayName, username, currentImageURL, imageURL, uid, usersData, fetchUser, changeLoading, navigation) => {
    const isRegister = usersData.filter((user) => user.username == displayName)
    const filteredUsersData = usersData.filter((user) => user.username != displayName)
    var data

    try {
        let photoURL = null;

        if (imageURL !== currentImageURL && imageURL !== null) {
            const ref = storage().ref(uid)
            await ref.putFile(imageURL)
            photoURL = await ref.getDownloadURL()
        } else if (imageURL === null) {
            photoURL = null
        } else {
            photoURL = currentImageURL
        }

        await auth().currentUser.updateProfile({
            displayName: username,
            photoURL: photoURL
        })

        if (isRegister.length != 0) {
            data = [...filteredUsersData, {
                username: username,
                imageURL: photoURL,
                point: isRegister[0].point
            }]
        } else {
            data = [...usersData, {
                username: username,
                imageURL: photoURL,
                point: 0
            }]
        }

        await firestore()
            .collection("Users")
            .doc("usersData")
            .update({
                dataset: data
            })

        await fetchUser()
        navigation.reset({
            index: 0,
            routes: [{ name: "Home" }]
        })
    } catch (error) {
        console.error(error)
    } finally {
        changeLoading(false)
    }
}

export const updatePassword = async (currentPassword, newPassword, resetForm, initialValues, changeLoading) => {
    changeLoading(true)
    try {
        const user = auth().currentUser
        const credential = auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        )

        await user.reauthenticateWithCredential(credential)
        if (currentPassword === newPassword)
            message("Current password and new password must be different.")
        else
            user
                .updatePassword(newPassword)
                .then(() => {
                    message("Password updated.")
                    resetForm({ values: initialValues })
                })
                .catch((error) => console.log(error))

    } catch (error) {
        error.code === "auth/wrong-password" && message("Current password does not match.")
    } finally {
        changeLoading(false)
    }
}

export const updateEmail = async (password, newEmail, resetForm, initialValues, fetchUser, changeLoading) => {
    changeLoading(true)
    try {
        const user = auth().currentUser
        if (user.email === newEmail)
            message("Current email and new email must be different.")
        else {
            const credential = auth.EmailAuthProvider.credential(
                user.email,
                password
            )
            await user.reauthenticateWithCredential(credential)
            user
                .updateEmail(newEmail)
                .then(() => {
                    message("Email updated")
                    resetForm({ values: initialValues })
                    fetchUser()
                })
        }
    } catch (error) {
        error.code === "auth/wrong-password" && message("Current password does not match.")
    } finally {
        changeLoading(false)
    }
}

export const forgetPassword = (email, resetFrom, initialValues, closeResetModal) => {
    auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            message("Please check your e-mail")
            closeResetModal()
        })
        .catch((error) => message(errorMessage(error.code)))
        .finally(() => {
            closeResetModal()
            resetFrom({ values: initialValues })
        })
}