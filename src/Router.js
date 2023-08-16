import React from 'react'
import colors from './utils/colors'

// navigator
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

// screens
import SignUp from './screens/auth/SignUpScreen'
import SignIn from './screens/auth/SignInScreen'
import Home from './screens/HomeScreen'
import Settings from './screens/SettingsScreen'
import Leaderboard from './screens/LeaderboardScreen'
import TestSettings from './screens/TestSettingsScreen'
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
    <NavigationContainer theme={{ colors: { background: colors.background } }} >
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Auth' >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='Leaderboard' component={Leaderboard} />
        <Stack.Screen name='TestSettings' component={TestSettings} />
        <Stack.Screen name='Exam' component={Exam} />
        <Stack.Screen name='Result' component={Result} />
        <Stack.Screen name='Auth' component={AuthStack} />
      </Stack.Navigator>
      <FlashMessage position={"top"} />
    </NavigationContainer>
  )
}