import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  reviewId: number;
  rating: string;
  content: string;
  member: {
    id: number;
    email: string;
    nickname: string;
    profileImg: string;
  };
};

const initialState: InitialState = {
  reviewId: 0,
  rating: '',
  content: '',
  member: {
    id: 0,
    email: '',
    nickname: '',
    profileImg: '',
  },
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
