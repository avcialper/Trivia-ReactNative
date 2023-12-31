import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

// package
import { Formik } from 'formik'

// components
import Input from '../../../components/Input'
import Button from '../../../components/Button'

// utils
import { signUpValidations } from '../../../utils/validations'
import { signUp } from '../../../utils/auth'

import useStore from '../../../useStore'

export default ({ navigation }) => {

    const setUser = useStore((state) => state.setUser)

    const initialValues = {
        email: "",
        password: "",
        passwordConfirm: ""
    }

    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/triviaRemovedBG.png")} style={styles.image} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => signUp(values, setUser, navigation, resetForm, initialValues)}
                validationSchema={signUpValidations}
            >
                {({ values, errors, touched, handleChange, handleSubmit }) => (
                    <>
                        <Input
                            placeholder={"Email"}
                            primaryIcon={"email"}
                            text={values.email}
                            setText={handleChange("email")}
                            keyboardType='email-address'
                            errorMessage={errors.email && touched.email ? errors.email : ""}
                        />
                        <Input
                            placeholder={"Password"}
                            primaryIcon={"eye-off"}
                            secondaryIcon={"eye"}
                            text={values.password}
                            setText={handleChange("password")}
                            errorMessage={errors.password && touched.password ? errors.password : ""}
                            isSecure={true}
                            changableIcon={true}
                        />
                        <Input
                            placeholder={"Password confirm"}
                            primaryIcon={"eye-off"}
                            secondaryIcon={"eye"}
                            text={values.passwordConfirm}
                            setText={handleChange("passwordConfirm")}
                            errorMessage={errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : ""}
                            isSecure={true}
                            changableIcon={true}
                        />
                        <Button title={"SIGN UP"} onPress={() => handleSubmit(values)} />
                    </>
                )}
            </Formik>
            <View style={styles.signInContainer} >
                <Text style={styles.signInText} >You have an account?</Text>
                <Text style={[styles.signInText, { color: '#1B7CD6' }]} onPress={() => navigation.navigate('SignIn')}> Sign In</Text>
            </View>
        </View>
    )
}