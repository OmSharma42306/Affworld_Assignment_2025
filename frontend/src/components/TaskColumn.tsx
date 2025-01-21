import React from 'react';
import { useDrop } from 'react-dnd';
import { TaskCard } from './TaskCard';
import { Task } from '../types';

interface TaskColumnProps {
  title: string;
  status: 'pending' | 'completed' | 'done';
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: string) => void;
  onDelete: (id: string) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  status,
  tasks,
  onTaskMove,
  onDelete,
}) => {

  console.log("TASKS FROM TAKS COLCUN",tasks)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      onTaskMove(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getColumnColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
      case 'completed':
        return 'bg-blue-50 border-blue-200';
      case 'done':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-h-[500px] p-4 rounded-lg border-2 ${getColumnColor()} ${
        isOver ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      
      <div className="space-y-3">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard key={task._id} task={task} onDelete={onDelete} />
          ))}
      </div>
    </div>
  );
};