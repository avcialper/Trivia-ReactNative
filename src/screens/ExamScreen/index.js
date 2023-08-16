import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import styles from './styles'

// components
import OptionsButton from '../../components/OptionsButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import useStore from '../../useStore'

export default ({ navigation }) => {

    /*
        YAPILACAKLAR
        - Sınav esnasında geri gitme işlemine alert ekle
        - Sınav sonucunu sisteme kaydet
        - Yönlendirme işlemlerini düzenle
    */

    const questions = useStore((state) => state.questions)

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

    useEffect(() => {

        const interval = setInterval(() => {
            if (timer > 0)
                setTimer(prev => prev - 1)
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
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Result" }]
                    })
                }
            }
        }, 1000)
        return () => clearInterval(interval)

    }, [timer])

    useEffect(() => {

        const suffledAnswers = questions[questionIndex].incorrect_answers.length != 1 ? [
            questions[questionIndex].correct_answer,
            ...questions[questionIndex].incorrect_answers
        ].sort(() => Math.random() - 0.5) : ["True", "False"]

        setAnswers(suffledAnswers)
        setCurrentQuestion(questions[questionIndex].question)

    }, [questionIndex])

    return (
        <View style={styles.container} >
            <Image source={require("../../assets/triviaRemovedBG.png")} style={styles.image} />
            <View style={styles.question} >
                <Text style={styles.category} >{questions[questionIndex].category}</Text>
                <Text style={styles.questionText} >{questionIndex + 1}- {currentQuestion}</Text>
            </View>
            <View style={styles.point} >
                <Icon name='shield-crown' size={36} color={'#a1751f'} />
                <Text style={styles.countText} >{point}</Text>
            </View>
            <View style={styles.timer} >
                <Text style={styles.countText} >{timer}</Text>
                <Icon name='timer-sand-full' size={36} color={'#a1751f'} />
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
        </View>
    )
}