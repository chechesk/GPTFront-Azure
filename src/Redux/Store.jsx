import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slice/Auth'

export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})