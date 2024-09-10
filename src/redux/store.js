import { configureStore } from '@reduxjs/toolkit';
import blogReducer, { savePostsMiddleware } from './blogSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(savePostsMiddleware),
});