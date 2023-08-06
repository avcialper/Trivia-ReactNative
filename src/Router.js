import React from 'react'

// navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// screens
import SignUp from './screens/auth/SignUpScreen'
import SignIn from './screens/auth/SignInScreen'
import Home from './screens/HomeScreen'
import Exam from './screens/ExamScreen'
import Result from './screens/ResultScreen'

import FlashMessage from 'react-native-flash-message'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Auth' component={AuthStack} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Exam' component={Exam} />
        <Stack.Screen name='Result' component={Result} />
      </Stack.Navigator>
      <FlashMessage position={"top"} />
    </NavigationContainer>
  )
}