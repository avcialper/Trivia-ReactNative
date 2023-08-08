import { create } from "zustand"
import auth from "@react-native-firebase/auth"

const store = (set) => ({
    user: null,
    userData: null,
    loading: true,
    setUser: (data) => set({ user: data }),
    setUserData: (data) => set({ userData: data }),
    fetchUser: () => {
        const data = auth().currentUser
        data ? set({ user: data, loading: false }) : set({ loading: false })
    }
})

export default useStore = create(store)