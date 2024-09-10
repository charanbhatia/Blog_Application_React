import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { deletePost } from '../redux/blogSlice';

function BlogList({ posts }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id));
    }
  };

  return (
    <Grid container spacing={2}>
      {posts.map(post => (
        <Grid item xs={12} sm={6} md={4} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h5" component={Link} to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {post.title}
              </Typography>
              <Typography color="textSecondary">
                {post.category} - {new Date(post.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" noWrap style={{ marginTop: '0.5rem' }}>
                {post.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
              </Typography>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button size="small" color="primary" onClick={() => handleEdit(post.id)} style={{ marginRight: '0.5rem' }}>
                  Edit
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(post.id)}>
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BlogList;