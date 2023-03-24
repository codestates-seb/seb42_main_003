import { createSlice } from '@reduxjs/toolkit';

const initialState:MemberInfo|null=null;

const memberInfoSlice = createSlice({
  name: 'memberInfo',
  initialState,
  reducers: {
    setMemberInfo: (state, action) => {
      return state=action.payload;
    },
    removeMemberInfo: (state) => {
      return state=null;
    },
  },
});

export const { setMemberInfo,removeMemberInfo } = memberInfoSlice.actions;
export default memberInfoSlice;
