import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import {  updateUsernameAndImage } from "./auth"
import { showMessage } from 'react-native-flash-message'
import colors from "./colors"

export const message = (message) => {
    showMessage({
        message: message,
        type: 'default',
        backgroundColor: colors.main,
        color: 'white'
    })
}

export const takePhoto = async (currentUser, setCurrentUser) => {
    try {
        const result = await launchCamera({
            mediaType: "photo",
            quality: 1
        })
        setCurrentUser({ ...currentUser, imageURL: result.assets[0].uri })
    } catch (error) {
        console.log(error)
    }
}

export const takeImageFromLibrary = async (currentUser, setCurrentUser) => {
    try {
        const result = await launchImageLibrary({
            mediaType: "photo",
            quality: 1
        })
        setCurrentUser({ ...currentUser, imageURL: result.assets[0].uri })
    } catch (error) {
        console.log(error)
    }
}

export const handleSave = (displayName, currentUser, setError, navigation, user, fetchUser, changeLoading, usersData) => {

    const usernameIsRegister = usersData.filter((item) => item.username == currentUser.name && item.username != displayName)

    if (currentUser.name === "") {
        setError("Please enter a username.")
        return
    }
    else if (currentUser.name.length > 16) {
        setError("Username must be less than 16 characters.")
        return
    } else if (usernameIsRegister.length != 0) {
        setError("Usernmae already exists.")
        return
    }

    updateUsernameAndImage(displayName, currentUser.name, user.photoURL, currentUser.imageURL, user.uid, usersData, fetchUser, changeLoading, navigation)
}