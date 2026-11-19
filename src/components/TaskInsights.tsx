import React from 'react';
import { Card, CardContent, Typography, Grid, LinearProgress, Box, Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FlagIcon from '@mui/icons-material/Flag';
import { Task } from '../types/task';

interface TaskInsightsProps {
  tasks: Task[];
}

export const TaskInsights: React.FC<TaskInsightsProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const pending = total - completed;
  const progressPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const pendingTasksWithDate = tasks
    .filter((t) => t.status === 'Pending' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const nearestTask = pendingTasksWithDate[0];

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleOutlineIcon color="success" />
                <Typography color="text.secondary" variant="body2">
                  Completed Tasks
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PendingActionsIcon color="warning" />
                <Typography color="text.secondary" variant="body2">
                  Pending Tasks
                </Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
                {pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Card variant="outlined" sx={{ height: '100%', borderColor: '#38bdf8' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlagIcon sx={{ color: '#0284c7' }} />
                <Typography color="text.secondary" variant="body2">
                  Today's Focus
                </Typography>
              </Box>
              {nearestTask ? (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
                    {nearestTask.title}
                  </Typography>
                  <Chip
                    label={`Due: ${nearestTask.dueDate}`}
                    size="small"
                    color="primary"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              ) : (
                <Typography variant="body2" sx={{ mt: 1.5, color: '#64748b' }}>
                  All scheduled tasks cleared!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Weekly Progress
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {progressPercent}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 10, borderRadius: 5 }} />
      </Box>
    </Box>
  );
};