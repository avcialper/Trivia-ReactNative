import React, { useEffect } from 'react'
import { View, Text, Image, LogBox } from 'react-native'
import styles from './styles'

// components
import Input from '../../../components/Input'
import Button from '../../../components/Button'

// validation
import { signInValidations } from '../../../utils/validations'

// auth function
import { signIn } from '../../../utils/auth'

import useStore from '../../../useStore'
import { Formik } from 'formik'

// for navigation error
LogBox.ignoreLogs(["Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`Unknown`)"])

export default ({ navigation }) => {

    const user = useStore((state) => state.user)
    const loading = useStore((state) => state.loading)
    const fetchUser = useStore((state) => state.fetchUser)
    const setUser = useStore((state) => state.setUser)

    useEffect(() => {
        fetchUser()
    }, [])

    if (user !== null) navigation.reset({
        index: 0,
        routes: [{name: "Home"}]
    })
    
    return (
        <View style={[styles.container, loading && { justifyContent: 'center' }]} >
            <Image source={require('../../../assets/triviaRemovedBG.png')} style={styles.image} />
            {!loading && <>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    onSubmit={(values) => signIn(values, setUser)}
                    validationSchema={signInValidations}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <>
                            <Input
                                placeholder={'E-mail'}
                                primaryIcon={'account'}
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
                    <Text style={[styles.signUpText, { color: '#1B7CD6' }]} onPress={() => navigation.navigate('SignUp')}> Sign Up</Text>
                </View>
            </>}
        </View>
    )
}