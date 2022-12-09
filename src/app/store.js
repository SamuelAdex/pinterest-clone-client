import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import pinReducer from '../features/pinSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    pin: pinReducer
  },
});
