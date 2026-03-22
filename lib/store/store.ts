import { configureStore } from "@reduxjs/toolkit"
import adminSlice from "../store/admin/auth/admin-slice"
import authSlice from "../store/auth/auth-slice"
import productSlice from "../store/admin/product/prodluct-slice"
import checkOutSlice from "../store/check-out/check-out-slice"

const store=configureStore({
    reducer:{
        adminSlice,
        authSlice,
        productSlice,
        checkOutSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>