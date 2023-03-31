import { createSlice } from '@reduxjs/toolkit';

let initialState: any = [];

const campingSlice = createSlice({
  name: 'memberInfo',
  initialState,
  reducers: {
    setCampingList: (state, action) => {
      return state.concat(action.payload);
    },
    removeMemberInfo: state => {
      return (state = initialState);
    },
  },
});

export const { setCampingList } = campingSlice.actions;
export default campingSlice;
