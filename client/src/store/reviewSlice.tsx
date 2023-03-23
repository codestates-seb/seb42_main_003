import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  id: number;
  image: string;
  user: string;
  createdAt: string;
  grade: number;
  body: string;
};

const initialState: InitialState = {
  id: 0,
  image: '',
  user: '',
  createdAt: '',
  grade: 0,
  body: '',
};
const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    edit: (state, action) => {
      return action.payload;
    },
    reset: (state, action) => {
      return (state = action.payload);
    },
  },
});

export default reviewSlice;
export const { edit, reset } = reviewSlice.actions;
