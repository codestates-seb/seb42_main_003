import { createSlice } from '@reduxjs/toolkit';

let initialState: any = [];

const campingSlice = createSlice({
  name: 'camping',
  initialState,
  reducers: {
    setCampingList: (state, action) => {
      return action.payload;
    },
    addCampingList: (state, action) => {
      return state.concat(action.payload);
    },
  },
});

export const { setCampingList, addCampingList } = campingSlice.actions;
export default campingSlice;
