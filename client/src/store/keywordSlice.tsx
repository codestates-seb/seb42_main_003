import { createSlice } from '@reduxjs/toolkit';

type InitialState = { id: number; keyword: string | null }[];

const initialState: InitialState = [];
const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    add: (state, action) => {
      if (
        state.length < 3 &&
        state.filter(data => data.id === action.payload.id).length !== 1
      ) {
        state.push({
          id: action.payload.id,
          keyword: action.payload.keyword,
        });
      }
    },
    remove: (state, action) => {
      return state.filter(e => e.id !== action.payload);
    },
    reset: (state, action) => {
      return (state = action.payload);
    },
  },
});

export default keywordSlice;
export const { add, remove, reset } = keywordSlice.actions;
