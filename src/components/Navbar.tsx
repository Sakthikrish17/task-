import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: '#1e293b' }}>
      <Toolbar>
        <AssignmentTurnedInIcon sx={{ mr: 1.5, color: '#38bdf8' }} />
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            TaskTrackr
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            Smart Student To-Do Dashboard
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};