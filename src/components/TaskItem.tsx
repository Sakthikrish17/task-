import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleStatus }) => {
  const isCompleted = task.status === 'Completed';

  const categoryColor = {
    Study: 'primary',
    Personal: 'secondary',
    Club: 'warning',
  }[task.category] as 'primary' | 'secondary' | 'warning';

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        opacity: isCompleted ? 0.75 : 1,
        backgroundColor: isCompleted ? '#f8fafc' : '#ffffff',
        borderLeft: isCompleted ? '6px solid #22c55e' : '6px solid #3b82f6',
        transition: 'all 0.2s ease-in-out',
        '&:hover': { boxShadow: 2 },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Chip
              label={task.category || 'General'}
              size="small"
              color={categoryColor}
              variant="outlined"
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: '#64748b',
                fontSize: '0.85rem',
              }}
            >
              <CalendarMonthIcon sx={{ fontSize: 16 }} />
              {task.dueDate || 'No deadline'}
            </Box>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: isCompleted ? 'line-through' : 'none',
              color: isCompleted ? '#64748b' : '#0f172a',
            }}
          >
            {task.title || 'Untitled Task'}
          </Typography>
        </Box>

        <Button
          variant={isCompleted ? 'outlined' : 'contained'}
          color={isCompleted ? 'inherit' : 'primary'}
          size="small"
          startIcon={
            isCompleted ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />
          }
          onClick={() => onToggleStatus(task.id)}
        >
          {task.status}
        </Button>
      </CardContent>
    </Card>
  );
};