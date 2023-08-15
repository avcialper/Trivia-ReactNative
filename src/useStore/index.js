import { create } from "zustand"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

const store = (set) => ({
    user: null,
    usersData: null,
    loading: false,
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
                set({usersData : documentSnapshot.data().dataset})
            });

        return () => subscriber()
    }
})

export default useStore = create(store)