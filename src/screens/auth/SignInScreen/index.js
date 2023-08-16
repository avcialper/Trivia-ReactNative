import React, { useEffect, useState } from 'react'
import { View, Text, Image, LogBox } from 'react-native'
import styles from './styles'

// packages
import { Formik } from 'formik'
import Modal from 'react-native-modal'

// components
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'

// utils
import { emailValidations, signInValidations } from '../../../utils/validations'
import { forgetPassword, signIn } from '../../../utils/auth'

import useStore from '../../../useStore'

// for navigation error
LogBox.ignoreLogs(["Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`Unknown`)"])

export default ({ navigation }) => {

    const user = useStore((state) => state.user)
    const setUser = useStore((state) => state.setUser)
    const loading = useStore((state) => state.loading)
    const fetchUser = useStore((state) => state.fetchUser)
    const fetchUsersData = useStore((state) => state.fetchUsersData)

    const [resetModal, setResetModal] = useState(false)

    useEffect(() => {
        fetchUser()
        fetchUsersData()
    })

    if (user !== null) {
        if (user.displayName)
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }]
            })
        else
            navigation.reset({
                index: 0,
                routes: [{ name: "Settings" }]
            })
    }

    const initialValues = {
        email: "",
        password: ""
    }

    const initialEmail = {
        email: ""
    }

    const closeResetModal = () => setResetModal(false)

    if (loading) return <Loading />

    return (
        <View style={styles.container} >
            <Image source={require('../../../assets/triviaRemovedBG.png')} style={styles.image} />
            {!loading && <>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => signIn(values, setUser, resetForm, initialValues)}
                    validationSchema={signInValidations}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <>
                            <Input
                                placeholder={'Email'}
                                primaryIcon={'email'}
                                text={values.email}
                                setText={handleChange("email")}
                                keyboardType='email-address'
                                errorMessage={touched.email && errors.email ? errors.email : ""}
                            />
                            <Input
                                placeholder={'Password'}
                                primaryIcon={'eye-off'}
                                secondaryIcon={'eye'}
                                changableIcon={true}
                                isSecure={true}
                                text={values.password}
                                setText={handleChange("password")}
                                errorMessage={touched.password && errors.password ? errors.password : ""}
                            />
                            <Button title={'SING IN'} onPress={() => handleSubmit(values)} />
                        </>
                    )}
                </Formik>
                <View style={styles.signUpContainer} >
                    <Text style={styles.signUpText} >Don't have an account?</Text>
                    <Text
                        style={[styles.signUpText, { color: '#1B7CD6' }]}
                        onPress={() => navigation.navigate('SignUp')}
                    > Sign Up</Text>
                </View>
                <Text onPress={() => setResetModal(true)} style={styles.forgotText} >Forget password?</Text>
                <Modal
                    isVisible={resetModal}
                    animationInTiming={800}
                    animationOutTiming={800}
                    swipeDirection={'down'}
                    onSwipeComplete={() => closeResetModal()}
                    onBackButtonPress={() => closeResetModal()}
                    onBackdropPress={() => closeResetModal()}
                    style={styles.modal}
                >
                    <View style={styles.modalContainer} >
                        <Formik
                            initialValues={initialEmail}
                            validationSchema={emailValidations}
                            onSubmit={(values, { resetForm }) => forgetPassword(values.email, resetForm, initialEmail, closeResetModal)}
                        >{({ values, errors, touched, handleChange, handleSubmit }) => (
                            <>
                                <Input
                                    placeholder={"Email"}
                                    primaryIcon={"email"}
                                    text={values.email}
                                    setText={handleChange("email")}
                                    errorMessage={errors.email && touched.email ? errors.email : ""}
                                    keyboardType='email-address'
                                />
                                <Button title={"Send Mail"} onPress={(values) => handleSubmit(values)} />
                            </>
                        )}
                        </Formik>
                    </View>
                </Modal>
            </>}
        </View>
    )
}