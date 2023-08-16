import { create } from "zustand"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"
import axios from "axios"

const store = (set) => ({
    user: null,
    usersData: null,
    loading: false,
    questions: null,
    setUser: (data) => set({ user: data }),
    setUsersData: (data) => set({ userData: data }),
    setLoading: (data) => set({ loading: data }),
    fetchUser: () => {
        const data = auth().currentUser
        if (data) set({ user: data })
    },
    fetchUsersData: () => {
        const subscriber = firestore()
            .collection('Users')
            .doc('usersData')
            .onSnapshot(documentSnapshot => {
                set({ usersData: documentSnapshot.data().dataset })
            })

        return () => subscriber()
    },
    fetchQuestions: async (url) => {
        set({ loading: true })
        try {
            const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${url}`)
            set({ questions: data.results })
        } catch (error) {
            console.log(error)
        }
        set({ loading: false })
    }
})

export default useStore = create(store)