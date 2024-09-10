import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogForm from '../components/BlogForm';

function CreatePostPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreatePostPage;