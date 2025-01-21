import React from 'react';
import { useDrag } from 'react-dnd';
import { Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task._id);
    }
  };

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-sm mb-3 cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{task.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};