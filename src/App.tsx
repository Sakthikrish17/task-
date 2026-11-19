import React, { useState, useEffect } from 'react';
import { Container, Alert } from '@mui/material';
import { Task, TaskCategory, TaskStatus } from './types/task';
import { fetchTasks } from './services/taskService';
import { Navbar } from './components/Navbar';
import { TaskInsights } from './components/TaskInsights';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('All');

  useEffect(() => {
    const loadInitialTasks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTasks();
        setTasks(data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage('Failed to load tasks. Please verify your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialTasks();
  }, []);

  const handleToggleStatus = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <TaskInsights tasks={tasks} />

        <TaskFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <TaskList
          tasks={filteredTasks}
          isLoading={isLoading}
          onToggleStatus={handleToggleStatus}
        />
      </Container>
    </>
  );
};

export default App;
