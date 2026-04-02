import { configureStore } from "@reduxjs/toolkit"
import adminSlice from "../store/admin/auth/admin-slice"
import authSlice from "../store/auth/auth-slice"
import productSlice from "./admin/product/product-slice"
import checkOutSlice from "../store/check-out/check-out-slice"
import orderSlice from "../store/order/order-slice"

const store=configureStore({
    reducer:{
        adminSlice,
        authSlice,
        productSlice,
        checkOutSlice,
        orderSlice
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>