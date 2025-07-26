import { configureStore } from "@reduxjs/toolkit"
import gameSessionReducer from "./slices/gameSessionSlice"
import orderReducer from "./slices/orderSlice"
import profileFlowReducer from './slices/profileFlowSlice';
import errorReducer from './slices/errorSlice';

export const store = configureStore({
  reducer: {
    profileFlow: profileFlowReducer,
    gameSession: gameSessionReducer,
    order: orderReducer,
    error: errorReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
