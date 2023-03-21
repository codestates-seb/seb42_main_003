import { createSlice } from '@reduxjs/toolkit';

type InitialState = boolean;

const initialState: InitialState = false;
const clickedSlice = createSlice({
  name: 'clicked',
  initialState,
  reducers: {
    click: (state, action) => {
      return action.payload;
    },
  },
});

export default clickedSlice;
export const { click } = clickedSlice.actions;
