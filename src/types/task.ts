export type TaskCategory = 'All' | 'Study' | 'Personal' | 'Club';
export type TaskStatus = 'All' | 'Pending' | 'Completed';

export interface Task {
  id: number;
  title: string;
  category: 'Study' | 'Personal' | 'Club';
  dueDate: string;
  status: 'Pending' | 'Completed';
}