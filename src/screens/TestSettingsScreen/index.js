import React, { useState } from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

// packages
import { Picker } from '@react-native-picker/picker'

// components
import SelectionButton from '../../components/SelectionButton'
import Button from '../../components/Button'
import Loading from '../../components/Loading'

import { categories } from '../../utils/categories'
import useStore from '../../useStore'

export default ({ navigation }) => {

    const questions = useStore((state) => state.questions)
    const fetchQuestions = useStore((state) => state.fetchQuestions)
    const loading = useStore((state) => state.loading)

    const [category, setCategory] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("")
    const [start, setStart] = useState(false)

    const startFetch = () => {
        setStart(true)
        let url = ""
        if (category)
            url += `&category=${category}`
        if (selectedDifficulty)
            url += `&difficulty=${selectedDifficulty}`
        if (selectedType)
            url += `&type=${selectedType}`
        fetchQuestions(url)
    }

    if (loading) <Loading />

    if (start && questions) {
        setStart(false)
        navigation.navigate("Exam")
    }

    return (
        <View style={styles.container} >
            <Image source={require("../../assets/triviaRemovedBG.png")} style={styles.image} />
            <Picker
                selectedValue={category}
                mode='dropdown'
                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                style={styles.picker}
                dropdownIconColor={'black'}
            >
                <Picker.Item label='Any' value={""} color='black' style={{ backgroundColor: 'whitesmoke' }} />
                {
                    categories.map(item => (
                        <Picker.Item
                            label={item.category}
                            value={item.id}
                            key={item.id}
                            color='black'
                            style={{ backgroundColor: 'whitesmoke' }}
                        />
                    ))
                }
            </Picker>
            <View style={styles.selectionContainer} >
                <SelectionButton
                    title={"Mixed"}
                    topLeftRadius={16}
                    bottomLeftRadius={16}
                    isSelected={selectedType === ""}
                    onPress={() => setSelectedType("")}
                />
                <SelectionButton
                    title={"Multiple Choice"}
                    isSelected={selectedType === "multiple"}
                    onPress={() => setSelectedType("multiple")}
                />
                <SelectionButton
                    title={"True False"}
                    topRightRadius={16}
                    bottomRightRadius={16}
                    selectable={selectedDifficulty !== "hard"}
                    isSelected={selectedType === "boolean"}
                    onPress={() => selectedDifficulty !== "hard" && setSelectedType("boolean")}
                />
            </View>
            <View style={[styles.selectionContainer, { marginBottom: 0 }]} >
                <SelectionButton
                    title={"Any"}
                    topLeftRadius={16}
                    isSelected={selectedDifficulty === ""}
                    onPress={() => setSelectedDifficulty("")}
                />
                <SelectionButton
                    title={"Easy"}
                    topRightRadius={16}
                    isSelected={selectedDifficulty === "easy"}
                    onPress={() => setSelectedDifficulty("easy")}
                />
            </View>
            <View style={[styles.selectionContainer, { marginTop: 0 }]} >
                <SelectionButton
                    title={"Medium"}
                    bottomLeftRadius={16}
                    isSelected={selectedDifficulty === "medium"}
                    onPress={() => setSelectedDifficulty("medium")}
                />
                <SelectionButton
                    title={"Hard"}
                    bottomRightRadius={16}
                    isSelected={selectedDifficulty === "hard"}
                    selectable={selectedType === "" || selectedType === "multiple"}
                    onPress={() => (selectedType === "" || selectedType === "multiple") && setSelectedDifficulty("hard")}
                />
            </View>
            <Button title={"START"} onPress={() => startFetch()} />
        </View>
    )
}