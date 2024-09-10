import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editPost } from '../redux/blogSlice';
import { TextField, Button, Container, Typography } from '@mui/material';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const post = useSelector(state => state.blog.posts.find(p => p.id === parseInt(id)));

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content.replace(/<[^>]*>/g, ''));
      setCategory(post.category);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(editPost({
        id: post.id,
        title,
        content,
        category,
        date: new Date().toISOString()
      }));
      navigate(`/post/${post.id}`);
    }
  };

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Edit Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          fullWidth
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
          Update Post
        </Button>
      </form>
    </Container>
  );
}

export default EditPostPage;