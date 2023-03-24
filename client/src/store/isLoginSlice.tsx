import { createSlice } from '@reduxjs/toolkit';

const initialState:Boolean=false;

const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    login: (state) => {
      return true;
    },
    logout: (state) => {
      return false;
    },
  },
});

export const { login,logout } = isLoginSlice.actions;
export default isLoginSlice;
