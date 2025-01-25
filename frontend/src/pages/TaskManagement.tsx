import  { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskForm } from '../components/TaskForm';
import { TaskColumn } from '../components/TaskColumn';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../api';
import { Task } from '../types';
import { Link } from 'react-router-dom';
function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [firstTask,setFirstTask] = useState<boolean>(false);
  useEffect(() => {
      
        fetchTasks();
      
     
  }, []);

  // handling function for fetching all the tasks.
  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      
      if(tasksData.length>0){
        console.log("i am in")
        setTasks(tasksData);
        setFirstTask(true);
        console.log("Tasks",tasksData)  //  If tasks exist, set `firstTask` to true
      }
      
      console.log("Tasks",tasksData)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  // function handler for Creating Tasks.
  const handleCreateTask = async (name: string, description: string) => {
    try {
      
      
      
        console.log("i am not firsttask")
        const newTask: Task = await createTask(name,description)
        setFirstTask(true)
        setTasks((prevTasks)=>[...prevTasks, newTask]);
      
      
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Task Moving Handling from One Section to another like with task status
  const handleTaskMove = async (taskId: string, newStatus: string) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus as Task['status'] } : task
        )
      );
      await updateTaskStatus(taskId,newStatus)

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Task Deletion Handling
  const handleDeleteTask = async (taskId: string) => {
    try {
      // Update local state first for immediate UI feedback
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      await deleteTask(taskId);
      
      
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  if(firstTask){
    return (
      // adding DndProvider for Adding Drag and Drop Features to Task Page
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Task Management System</h1>
            <Link 
                        to="/dashboard"
                        className="bg-blue-500 hover:bg-blue-600 text-white mt-4 p-2 rounded-lg transition-colors"
                    >
                        Back
                    </Link>
                    </div>
            {/* Component of Creating Task */}
            <TaskForm onSubmit={handleCreateTask} />
            <div className="grid grid-cols-3 gap-6">
              {/* Component of Columns sending task with it's status */}
              <TaskColumn
                title="Pending"
                status="pending"
                tasks={tasks}
                onTaskMove={handleTaskMove}
                onDelete={handleDeleteTask}
              />
              {/* Component of Columns sending task with it's status */}
              <TaskColumn
                title="Completed"
                status="completed"
                tasks={tasks}
                onTaskMove={handleTaskMove}
                onDelete={handleDeleteTask}
              />
              {/* Component of Columns sending task with it's status */}
              <TaskColumn
                title="Done"
                status="done"
                tasks={tasks}
                onTaskMove={handleTaskMove}
                onDelete={handleDeleteTask}
              />
            </div>
          </div>
        </div>
      </DndProvider>
    );
  }
  return <div>
    {/* creating the tasks initially because above function fetches and render the existing tasks and gives a createTask component
    to create the tasks. but this like initial user don't have any tasks. so initial user we have to render this createTask Component
    only. */}
  <TaskForm onSubmit={handleCreateTask} />
</div>
}

export default TaskManagement;