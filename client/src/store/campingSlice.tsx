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
      if (state.length < 151) {
        return state.concat(action.payload);
      }
    },
  },
});

export const { setCampingList, addCampingList } = campingSlice.actions;
export default campingSlice;
