import { configureStore } from '@reduxjs/toolkit'

import dashboardReducer from "../features/dashbaordSlice"

export const store = configureStore({
    reducer: dashboardReducer
})