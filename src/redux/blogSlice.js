import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: JSON.parse(localStorage.getItem('blogPosts')) || [],
  categories: ['Technology', 'Travel', 'Food', 'Lifestyle'],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    editPost: (state, action) => {
      const { id, ...updatedPost } = action.payload;
      const index = state.posts.findIndex(post => post.id === id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...updatedPost };
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const { addPost, editPost, deletePost } = blogSlice.actions;

// Middleware to save posts to localStorage
export const savePostsMiddleware = store => next => action => {
  const result = next(action);
  if (action.type?.startsWith('blog/')) {
    const state = store.getState();
    localStorage.setItem('blogPosts', JSON.stringify(state.blog.posts));
  }
  return result;
};

export default blogSlice.reducer;