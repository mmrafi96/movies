import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice'
const initialState =0
export const store = configureStore({
  reducer: {
    home:homeSlice,
  }
})