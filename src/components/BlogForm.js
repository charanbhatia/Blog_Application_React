// src/components/BlogForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, editPost } from '../redux/blogSlice';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BlogForm({ post, onSubmit }) {
  const [title, setTitle] = useState(post ? post.title : '');
  const [content, setContent] = useState(post ? post.content : '');
  const [category, setCategory] = useState(post ? post.category : '');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newPost = {
        id: post ? post.id : Date.now(),
        title,
        content,
        category,
        date: new Date().toISOString(),
      };
      if (post) {
        dispatch(editPost(newPost));
      } else {
        dispatch(addPost(newPost));
      }
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        error={!!errors.title}
        helperText={errors.title}
      />
      <FormControl fullWidth margin="normal" error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="Technology">Technology</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Lifestyle">Lifestyle</MenuItem>
        </Select>
        {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
      </FormControl>
      <ReactQuill value={content} onChange={setContent} />
      {errors.content && <FormHelperText error>{errors.content}</FormHelperText>}
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
        {post ? 'Update Post' : 'Create Post'}
      </Button>
    </form>
  );
}

export default BlogForm;