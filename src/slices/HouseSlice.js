import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    houses: [], 
    selectedHouse: null,
};

const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setHouses: (state, action) => {
        state.houses = action.payload;
      },
      selectHouse: (state, action) => {
        state.selectedHouse = action.payload;
      },
  },
});

export const {  setHouses, selectHouse } = houseSlice.actions;
export default houseSlice.reducer;
