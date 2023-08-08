import React, { useState, useEffect } from 'react'
import { View, Pressable, Text, Image, ScrollView } from 'react-native'
import styles from './styles'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik } from 'formik'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import Modal from 'react-native-modal'

// components
import Input from '../../components/Input'
import Button from '../../components/Button'

// validations
import { updatePasswordValidations, updateEmailValidations } from '../../utils/validations'
import { createUserData, signOut, updateUsernameAndImage } from '../../utils/auth'
import useStore from '../../useStore'

export default ({ navigation }) => {

    const user = useStore((state) => state.user)
    const setUserData = useStore((state) => state.setUserData)
    const fetchUser = useStore((state) => state.fetchUser)

    const [camera, setCamera] = useState(false)
    const [currentUser, setCurrentUser] = useState({ name: "", imageURL: null })
    const [usernameError, setUsernameError] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    useEffect(() => {
        setCurrentUser({ name: user ? user.displayName : "", imageURL: user ? user.photoURL : null })
    }, [])

    const takePhoto = async () => {
        try {
            const result = await launchCamera({
                mediaType: 'photo',
                quality: 1
            })
            setCurrentUser({ ...currentUser, imageURL: result.assets[0].uri })
        } catch (error) {
            console.log(error)
        }
    }

    const takeImageFromLibrary = async () => {
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

    const handleUser = (text) => {
        if (text.length > 16)
            setUsernameError("Username must be less than 16 characters.")
        else if (text.length === 0) {
            setUsernameError("Please enter a username.")
            setCurrentUser({ ...currentUser, name: text })
        }
        else {
            setUsernameError("")
            setCurrentUser({ ...currentUser, name: text })
        }
    }

    const handleSave = () => {
        if (currentUser.name === "") {
            setUsernameError("Please enter a username.")
            return
        }
        const data = {
            username: currentUser.name,
            imageURL: currentUser.imageURL,
            point: 0
        }
        setUserData(data)
        createUserData(user.uid, data, navigation)
        updateUsernameAndImage(currentUser.name, currentUser.imageURL, navigation, fetchUser)
    }

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }} >
                <View style={styles.imageContainer} >
                    <Image source={currentUser.imageURL ? { uri: currentUser.imageURL } : require("../../assets/user.jpg")} style={styles.image} />
                    <Pressable style={styles.camera} onPress={() => setCamera(() => !camera)} >
                        <Icon name='camera' color={"white"} size={24} />
                    </Pressable>
                    {
                        camera &&
                        <View style={styles.buttonContainer} >
                            <Pressable style={[styles.imageButton, { backgroundColor: 'red' }]} onPress={() => currentUser.imageURL !== null && setDeleteModal(true)} >
                                <Icon name='delete-empty' color={"white"} size={24} />
                            </Pressable>
                            <Pressable style={[styles.imageButton, { backgroundColor: '#034844' }]} onPress={() => takeImageFromLibrary()} >
                                <Icon name='image' color={"white"} size={24} />
                            </Pressable>
                            <Pressable style={[styles.imageButton, { backgroundColor: '#2ba0ba' }]} onPress={() => takePhoto()} >
                                <Icon name='camera' color={"white"} size={24} />
                            </Pressable>
                        </View>
                    }
                </View>
                <ScrollView style={{ marginBottom: 16 }} >
                    <Input
                        placeholder={user ? user.displayName : "Username"}
                        primaryIcon={null}
                        text={currentUser.name}
                        setText={(text) => handleUser(text)}
                        errorMessage={usernameError}
                    />
                    <View style={styles.updateContainer} >
                        <Text style={styles.updateTitle} >Update Password</Text>
                        <Formik
                            initialValues={{
                                password: "",
                                newPassword: "",
                                newPasswordConfirm: ""
                            }}
                            onSubmit={(values) => console.log(values)}
                            validationSchema={updatePasswordValidations}
                        >{({ values, errors, touched, handleSubmit, handleChange }) => (
                            <>
                                <Input
                                    placeholder={"Current password"}
                                    primaryIcon={"eye-off"}
                                    secondaryIcon={"eye"}
                                    text={values.password}
                                    setText={handleChange("password")}
                                    changableIcon={true}
                                    errorMessage={errors.password && touched.password ? errors.password : ""}
                                    isSecure={true}
                                />
                                <Input
                                    placeholder={"New password"}
                                    primaryIcon={"eye-off"}
                                    secondaryIcon={"eye"}
                                    text={values.newPassword}
                                    setText={handleChange("newPassword")}
                                    changableIcon={true}
                                    errorMessage={errors.newPassword && touched.newPassword ? errors.newPassword : ""}
                                    isSecure={true}
                                />
                                <Input
                                    placeholder={"New password confirm"}
                                    primaryIcon={"eye-off"}
                                    secondaryIcon={"eye"}
                                    text={values.newPasswordConfirm}
                                    setText={handleChange("newPasswordConfirm")}
                                    changableIcon={true}
                                    errorMessage={errors.newPasswordConfirm && touched.newPasswordConfirm ? errors.newPasswordConfirm : ""}
                                    isSecure={true}
                                />
                                <Button title={"Confirm"} onPress={(values) => handleSubmit(values)} />
                            </>
                        )}
                        </Formik>
                    </View>
                    <View style={styles.updateContainer} >
                        <Text style={styles.updateTitle} >Update Email</Text>
                        <Formik
                            initialValues={{
                                email: "",
                                password: ""
                            }}
                            onSubmit={(values) => console.log(values)}
                            validationSchema={updateEmailValidations}
                        >{({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <Input
                                    placeholder={"Email"}
                                    primaryIcon={null}
                                    text={values.email}
                                    setText={handleChange("email")}
                                    errorMessage={errors.email && touched.email ? errors.email : ""}
                                    keyboardType="email-address"
                                />
                                <Input
                                    placeholder={"Password"}
                                    primaryIcon={"eye-off"}
                                    secondaryIcon={"eye"}
                                    text={values.password}
                                    setText={handleChange("password")}
                                    changableIcon={true}
                                    errorMessage={errors.password && touched.password ? errors.password : ""}
                                    isSecure={true}
                                />
                                <Button title={"Confirm"} onPress={(values) => handleSubmit(values)} />
                            </>
                        )}
                        </Formik>
                    </View>
                    <Button title={"Save"} onPress={() => handleSave()} />
                </ScrollView>
            </View>
            <Modal
                isVisible={deleteModal}
                swipeDirection={'down'}
                animationIn={'fadeInUpBig'}
                animationOut={'fadeOutDownBig'}
                animationInTiming={800}
                animationOutTiming={800}
                onBackdropPress={() => setDeleteModal(false)}
                onSwipeComplete={() => setDeleteModal(false)}
                onBackButtonPress={() => setDeleteModal(false)}
                avoidKeyboard={true}
            >
                <View style={styles.modalContainer} >
                    <Text style={styles.modalText} >Are you sure you want to delete your profile picture?</Text>
                    <View style={styles.answerArea} >
                        <Text style={styles.answerText}
                            onPress={() => {
                                setDeleteModal(false)
                                setCurrentUser({ ...currentUser, imageURL: null })
                            }}
                        >Yes</Text>
                        <Text style={styles.answerText} onPress={() => setDeleteModal(false)} >No</Text>
                    </View>
                </View>
            </Modal>
        </View >
    )
}