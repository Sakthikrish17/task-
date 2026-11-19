import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { TaskCategory, TaskStatus } from '../types/task';

interface TaskFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: TaskCategory;
  onCategoryChange: (category: TaskCategory) => void;
  selectedStatus: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 3 }}>
      <TextField
        fullWidth
        label="Search tasks by title..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category"
          onChange={(e) => onCategoryChange(e.target.value as TaskCategory)}
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Study">Study</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Club">Club</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={selectedStatus}
        exclusive
        size="small"
        onChange={(_, newStatus) => {
          if (newStatus !== null) onStatusChange(newStatus);
        }}
      >
        <ToggleButton value="All">All</ToggleButton>
        <ToggleButton value="Pending">Pending</ToggleButton>
        <ToggleButton value="Completed">Completed</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};