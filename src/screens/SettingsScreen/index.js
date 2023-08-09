import React, { useState, useEffect } from 'react'
import { View, Pressable, Text, Image, ScrollView } from 'react-native'
import styles from './styles'

// packages
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Formik } from 'formik'

// components
import Input from '../../components/Input'
import Button from '../../components/Button'
import PhotoEditButton from '../../components/PhotoEditButton'
import AlertModal from '../../components/AlertModal'
import Loading from '../../components/Loading'

// utils
import { updatePasswordValidations, updateEmailValidations } from '../../utils/validations'
import { handleSave, takeImageFromLibrary, takePhoto } from '../../utils/functions'
import { signOut, updateEmail, updatePassword } from '../../utils/auth'

import useStore from '../../useStore'

export default ({ navigation }) => {

    const user = useStore((state) => state.user)
    const setUser = useStore((state) => state.setUser)
    const setUserData = useStore((state) => state.setUserData)
    const fetchUser = useStore((state) => state.fetchUser)

    const [camera, setCamera] = useState(false)
    const [currentUser, setCurrentUser] = useState({ name: "", imageURL: null })
    const [usernameError, setUsernameError] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [logOut, setLogOut] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const initialPasswordValues = {
        password: "",
        newPassword: "",
        newPasswordConfirm: ""
    }

    const initialEmailValues = {
        email: "",
        password: ""
    }

    useEffect(() => {
        setCurrentUser({ name: user ? user.displayName : "", imageURL: user ? user.photoURL : null })
    }, [user])

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

    const changeLoading = (bool) => setIsLoading(bool)

    if (isLoading) return <Loading />

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }} >
                <View style={styles.imageContainer} >
                    <Image source={
                        currentUser.imageURL ?
                            { uri: currentUser.imageURL } :
                            require("../../assets/user.jpg")}
                        style={styles.image}
                    />
                    <Pressable
                        style={styles.camera}
                        onPress={() => setCamera(() => !camera)}
                    >
                        <Icon name='camera' color={"white"} size={24} />
                    </Pressable>
                    {
                        camera &&
                        <View style={styles.buttonContainer} >
                            <PhotoEditButton
                                backgroundColor={"red"}
                                name={"delete-empty"}
                                onPress={() => currentUser.imageURL !== null && setDeleteModal(true)}
                            />
                            <PhotoEditButton
                                backgroundColor={"#034844"}
                                name={"image"}
                                onPress={() => takeImageFromLibrary(currentUser, setCurrentUser)}
                            />
                            <PhotoEditButton
                                backgroundColor={"#2ba0ba"}
                                name={"camera"}
                                onPress={() => takePhoto(currentUser, setCurrentUser)}
                            />
                        </View>
                    }
                </View>
                <ScrollView>
                    <Input
                        placeholder={user && user.displayName !== " " ? user.displayName : "Username"}
                        primaryIcon={null}
                        text={currentUser.name}
                        setText={(text) => handleUser(text)}
                        errorMessage={usernameError}
                    />
                    <Text style={styles.email} >{user && user.email}</Text>
                    <View style={styles.updateContainer} >
                        <Text style={styles.updateTitle} >Update Password</Text>
                        <Formik
                            initialValues={initialPasswordValues}
                            onSubmit={(values, { resetForm }) =>
                                updatePassword(values.password, values.newPassword, resetForm, initialPasswordValues, changeLoading)
                            }
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
                                <Button
                                    title={"Confirm"}
                                    onPress={(values) => handleSubmit(values)}
                                />
                            </>
                        )}
                        </Formik>
                    </View>
                    <View style={styles.updateContainer} >
                        <Text style={styles.updateTitle} >Update Email</Text>
                        <Formik
                            initialValues={initialEmailValues}
                            onSubmit={(values, { resetForm }) => updateEmail(values.password, values.email, resetForm, initialEmailValues, fetchUser, changeLoading)}
                            validationSchema={updateEmailValidations}
                        >{({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <Input
                                    placeholder={"Email"}
                                    primaryIcon={"email"}
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
                    <Button
                        title={"Save"}
                        onPress={() => handleSave(currentUser, setUsernameError, navigation, user, setUserData, fetchUser, changeLoading)}
                    />
                </ScrollView>
            </View>
            <Pressable style={styles.logOut} onPress={() => setLogOut(true)} >
                <Icon name='exit-to-app' size={28} color={'white'} />
            </Pressable>
            <AlertModal
                visible={deleteModal}
                close={() => setDeleteModal(false)}
                message={"Are you sure you want to delete your profile picture?"}
                firstChoice={"Yes"}
                onFirstPress={() => {
                    setDeleteModal(false)
                    setCurrentUser({ ...currentUser, imageURL: null })
                }}
                secondChoice={"No"}
                onSecondPress={() => setDeleteModal(false)}
            />
            <AlertModal
                visible={logOut}
                close={() => setLogOut(false)}
                message={"Are you sure you want to sign out?"}
                firstChoice={"Yes"}
                onFirstPress={() => {
                    setLogOut(false)
                    signOut(setUser, navigation)
                }}
                secondChoice={"No"}
                onSecondPress={() => setLogOut(false)}
            />
        </View >
    )
}