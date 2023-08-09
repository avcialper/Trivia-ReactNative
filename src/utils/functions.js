import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { createUserData, updateUsernameAndImage } from "./auth"
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

export const handleSave = (currentUser, setError, navigation, user, setUserData, fetchUser, changeLoading) => {
    if (currentUser.name === "") {
        setError("Please enter a username.")
        return
    }
    else if (currentUser.name.length > 16) {
        setError("Username must be less than 16 characters.")
        return
    }
    const data = {
        username: currentUser.name,
        imageURL: currentUser.imageURL,
        point: 0
    }
    setUserData(data)
    createUserData(user.uid, data, navigation, changeLoading)
    updateUsernameAndImage(currentUser.name, currentUser.imageURL, user.photoURL, navigation, fetchUser, user.uid, changeLoading)
}