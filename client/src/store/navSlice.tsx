import { createSlice } from '@reduxjs/toolkit';

type InitialState = number;

const initialState: InitialState = 0;
const navSlice = createSlice({
  name: 'navmenu',
  initialState,
  reducers: {
    navNumber: (state, action) => {
      return action.payload;
    },
  },
});

export default navSlice;
export const { navNumber } = navSlice.actions;
