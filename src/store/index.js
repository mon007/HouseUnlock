import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../slices/LoginSlice';
import houseSlice from '../slices/HouseSlice';

export const store = configureStore({
  reducer: {
   login: loginSlice,
   houses : houseSlice  
  },
})