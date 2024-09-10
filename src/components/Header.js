import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header({ toggleTheme }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Blog App
        </Typography>
        <Button color="inherit" component={Link} to="/create">Create Post</Button>
        <Button color="inherit" onClick={toggleTheme}>Toggle Theme</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;