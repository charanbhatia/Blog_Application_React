import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';
import BlogList from './BlogList';

function CategoryPage() {
  const { category } = useParams();
  const posts = useSelector(state => state.blog.posts.filter(post => post.category === category));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {category} Blogs
      </Typography>
      <BlogList posts={posts} />
    </Container>
  );
}

export default CategoryPage;