import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Box } from '@mui/material';
import { deletePost } from '../redux/blogSlice';

function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const post = useSelector(state => 
    state.blog.posts.find(post => post.id === parseInt(id))
  );

  if (!post) {
    return <Typography>Post not found</Typography>;
  }

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(parseInt(id)));
      navigate('/');
    }
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="subtitle1">
        {post.category} - {new Date(post.date).toLocaleDateString()}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button onClick={handleEdit} color="primary" variant="contained" style={{ marginRight: 8 }}>
          Edit
        </Button>
        <Button onClick={handleDelete} color="secondary" variant="contained">
          Delete
        </Button>
      </Box>
    </Paper>
  );
}

export default BlogDetailPage;