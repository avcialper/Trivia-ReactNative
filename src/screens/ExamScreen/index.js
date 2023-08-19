import React, { useEffect, useState } from 'react'
import { View, Text, Image, BackHandler } from 'react-native'
import styles from './styles'

// components
import OptionsButton from '../../components/OptionsButton'
import AlertModal from '../../components/AlertModal'

// packages
import { decode } from 'html-entities'

import useStore from '../../useStore'
import { timerFun } from '../../utils/functions'

export default ({ navigation }) => {

    const questions = useStore((state) => state.questions)
    const usersData = useStore((state) => state.usersData)
    const user = useStore((state) => state.user)

    const [currentQuestion, setCurrentQuestion] = useState("")
    const [questionIndex, setQuestionIndex] = useState(0)
    const [timer, setTimer] = useState(12)
    const [answers, setAnswers] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [isTrue, setIsTrue] = useState(false)
    const [clearSelected, setClearSelected] = useState(true)
    const [point, setPoint] = useState(0)
    const [alertModal, setAlertModal] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => timerFun(
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
            user.displayName
        ), 1000)
        return () => clearInterval(interval)
    }, [timer, alertModal])

    useEffect(() => {

        const suffledAnswers = questions[questionIndex].incorrect_answers.length != 1 ? [
            questions[questionIndex].correct_answer,
            ...questions[questionIndex].incorrect_answers
        ].sort(() => Math.random() - 0.5) : ["True", "False"]

        setAnswers(suffledAnswers)
        setCurrentQuestion(decode(questions[questionIndex].question))

    }, [questionIndex])

    useEffect(() => {
        const backAction = () => {
            setAlertModal(true)
            return true
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        )

        return () => backHandler.remove()
    }, [])

    return (
        <View style={styles.container} >
            <Image source={require("../../assets/triviaRemovedBG.png")} style={styles.image} />
            <View style={styles.question} >
                <Text style={styles.category} >{questions[questionIndex].category}</Text>
                <Text style={styles.questionText} >{questionIndex + 1}- {currentQuestion}</Text>
            </View>
            <View style={styles.point} >
                <Image source={require('../../assets/crown.png')} />
                <Text style={styles.countText} >{point}</Text>
            </View>
            <View style={styles.timer} >
                <Text style={styles.countText} >{timer}</Text>
                <Image source={require('../../assets/timer.png')} />
            </View>
            {
                answers.length != 2 ?
                    answers.map((item, index) => (
                        <OptionsButton
                            text={item}
                            key={index}
                            onPress={() => {
                                setDisabled(true)
                                setTimer(3)
                                setSelectedAnswer(item)
                                setClearSelected(true)
                            }}
                            disabled={disabled}
                            isSelected={selectedAnswer === item && clearSelected}
                            isTrue={questions[questionIndex].correct_answer === item && showAnswer}
                            isFalse={selectedAnswer === item && !isTrue}
                        />
                    )) : (<>
                        <OptionsButton
                            text={"True"}
                            onPress={() => {
                                setDisabled(true)
                                setTimer(3)
                                setSelectedAnswer("True")
                                setClearSelected(true)
                            }}
                            disabled={disabled}
                            isSelected={selectedAnswer === "True" && clearSelected}
                            isTrue={questions[questionIndex].correct_answer === "True" && showAnswer}
                            isFalse={selectedAnswer === "True" && !isTrue}
                        />
                        <OptionsButton
                            text={"False"}
                            onPress={() => {
                                setDisabled(true)
                                setTimer(3)
                                setSelectedAnswer("False")
                                setClearSelected(true)
                            }}
                            disabled={disabled}
                            isSelected={selectedAnswer === "False" && clearSelected}
                            isTrue={questions[questionIndex].correct_answer === "False" && showAnswer}
                            isFalse={selectedAnswer === "False" && !isTrue}
                        />
                    </>)
            }
            <AlertModal
                visible={alertModal}
                close={() => setAlertModal(false)}
                message={"Are you sure you want to exit the challenge?"}
                firstChoice={"Yes"}
                onFirstPress={() => {
                    setAlertModal(false)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Home" }]
                    })
                }}
                secondChoice={"No"}
                onSecondPress={() => setAlertModal(false)}
            />
        </View>
    )
}