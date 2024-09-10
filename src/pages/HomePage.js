import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, Container, TextField, Grid, Button } from '@mui/material';
import BlogList from '../components/BlogList';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = useSelector(state => state.blog.categories);
  const posts = useSelector(state => state.blog.posts);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <TextField
        fullWidth
        label="Search posts"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
        {categories.map(category => (
          <Grid item key={category}>
            <Button
              component={Link}
              to={`/category/${category}`}
              variant="outlined"
              color="primary"
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
      <BlogList posts={filteredPosts} />
    </Container>
  );
}

export default HomePage;