import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleStatus: (id: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading, onToggleStatus }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          border: '1px dashed #cbd5e1',
          borderRadius: 2,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No tasks found matching your filter criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggleStatus={onToggleStatus} />
      ))}
    </Box>
  );
};