import { configureStore } from "@reduxjs/toolkit"
import adminSlice from "../store/admin/auth/admin-slice"
import authSlice from "../store/auth/auth-slice"

const store=configureStore({
    reducer:{
        adminSlice,
        authSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>