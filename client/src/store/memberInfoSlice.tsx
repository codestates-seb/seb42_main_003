import { createSlice } from '@reduxjs/toolkit';

let initialState: MemberInfo = {
  id: 0,
  email: '',
  nickname: '',
  profileImg: '',
  about: '',
  carName: '',
  oilInfo: '',
};

const memberInfoSlice = createSlice({
  name: 'memberInfo',
  initialState,
  reducers: {
    setMemberInfo: (state, action) => {
      return (state = action.payload);
    },
    removeMemberInfo: state => {
      return (state = initialState);
    },
  },
});

export const { setMemberInfo, removeMemberInfo } = memberInfoSlice.actions;
export default memberInfoSlice;
