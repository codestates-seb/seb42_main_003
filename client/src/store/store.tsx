import { configureStore } from '@reduxjs/toolkit';
import keywordSlice from './keywordSlice';
import clickedSlice from './clickedSlice';
import reviewSlice from './reviewSlice';
import memberInfoSlice from './memberInfoSlice';
import isLoginSlice from './isLoginSlice';
import navSlice from './navSlice';
import LoginModal from './loginModal';
import campingSlice from './campingSlice';

export const store = configureStore({
  reducer: {
    keyword: keywordSlice.reducer,
    clicked: clickedSlice.reducer,
    review: reviewSlice.reducer,
    memberInfo: memberInfoSlice.reducer,
    isLogin: isLoginSlice.reducer,
    navmenu: navSlice.reducer,
    loginmodal: LoginModal.reducer,
    campingList: campingSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
