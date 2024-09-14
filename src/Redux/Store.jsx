import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slice/Auth'
import chatReducer from './Slice/Chat'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        chat: chatReducer
    }
})