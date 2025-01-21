export interface Task {
    _id: string;
    name: string;
    description: string;
    status: 'Pending' | 'completed' | 'done';
  }