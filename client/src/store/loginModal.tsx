import { createSlice } from '@reduxjs/toolkit';

type InitialState = boolean;

const initialState: InitialState = false;

const LoginModal = createSlice({
  name: 'isLoginModal',
  initialState,
  reducers: {
    loginModal: (state, action) => {
      return action.payload;
    },
  },
});

export const { loginModal } = LoginModal.actions;
export default LoginModal;
