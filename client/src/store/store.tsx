import { configureStore } from '@reduxjs/toolkit';
import keywordSlice from './keywordSlice';
import clickedSlice from './clickedSlice';

export const store = configureStore({
  reducer: {
    keyword: keywordSlice.reducer,
    clicked: clickedSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
