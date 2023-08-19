import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { updateUsernameAndImage } from "./auth"
import { showMessage } from 'react-native-flash-message'
import colors from "./colors"
import firestore from '@react-native-firebase/firestore'

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

export const timerFun = (
    timer,
    alertModal,
    setTimer,
    clearSelected,
    setShowAnswer,
    setClearSelected,
    questions,
    questionIndex,
    selectedAnswer,
    setPoint,
    setQuestionIndex,
    setDisabled,
    setIsTrue,
    setSelectedAnswer,
    navigation,
    interval,
    point,
    usersData,
    username
) => {
    if (timer > 0) {
        if (!alertModal)
            setTimer(prev => prev - 1)
    }
    else {
        clearInterval(interval)
        if (clearSelected) {
            setShowAnswer(() => true)
            setTimer(3)
            setClearSelected(() => false)
            const isCorrect = questions[questionIndex].correct_answer === selectedAnswer
            setIsTrue(isCorrect)

            if (isCorrect) {
                const difficult = questions[questionIndex].difficult
                if (difficult === "easy")
                    setPoint((prev) => prev + 5)
                else if (difficult === "medium")
                    setPoint((prev) => prev + 7)
                else
                    setPoint((prev) => prev + 10)
            }

        }
        else if (questionIndex < questions.length - 1) {
            setQuestionIndex(prev => prev + 1)
            setTimer(12)
            setShowAnswer(() => false)
            setDisabled(() => false)
            setIsTrue(() => false)
            setSelectedAnswer(() => "")
            setClearSelected(() => true)
        } else {
            const data = usersData.map((item) => {
                if (item.username === username)
                    return { ...item, point: item.point + point }
                return item
            })
            firestore()
                .collection("Users")
                .doc("usersData")
                .update({
                    dataset: data
                })
            navigation.reset({
                index: 0,
                routes: [{ name: "Result", params: { point: point } }]
            })
        }
    }
}