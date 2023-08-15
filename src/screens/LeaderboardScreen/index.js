import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styles from './styles'

// components
import LeaderboardCard from '../../components/LeaderboardCard'

import useStore from '../../useStore'

export default () => {

    const user = useStore((state) => state.user)
    const usersData = useStore((state) => state.usersData)

    const [sortedData, setSortedData] = useState(usersData?.sort((a, b) => b.point - a.point))
    const [currentUserIndex, setCurrentUserIndex] = useState(0)

    const ref = useRef(null)

    useEffect(() => {
        const sorted = usersData?.sort((a, b) => b.point - a.point)
        setSortedData(sorted)

        const index = sorted?.findIndex(item => item.username === user.displayName)
        setCurrentUserIndex(index)

    }, [usersData])

    const scroll = () => ref.current?.scrollToIndex({ animated: true, index: currentUserIndex })

    const renderCard = ({ item, index }) =>
        <LeaderboardCard
            image={item.imageURL}
            point={item.point}
            username={item.username}
            index={index}
            currentUserIndex={currentUserIndex}
        />

    return (
        <View style={styles.container} >
            <Image source={require("../../assets/triviaRemovedBG.png")} style={styles.image} />
            <View style={styles.innerContainer} >
                <Text style={styles.title} onPress={() => scroll()} >LEADERBOARD</Text>
                <FlatList
                    ref={ref}
                    initialScrollIndex={currentUserIndex}
                    data={sortedData}
                    renderItem={renderCard}
                    ItemSeparatorComponent={() => <View style={styles.sperator} />}
                />
            </View>
        </View>
    )
}