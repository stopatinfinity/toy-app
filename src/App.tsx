import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
  interface Task {
    id: number;
    text: String;
    day: String;
    reminder: Boolean;
  };

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer);
    };

    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks = async() => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  }

  const fetchTask = async(id : number) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  // Add Task
  const addTask = async (task : Task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await response.json();

    setTasks([...tasks, data]);
    /*
    const id = Math.floor(Math.random() * 100000) + 1;

    const newTask : Task = {...task, id};

    setTasks([...tasks, newTask]);
    */
  }

  // Delete Task
  const deleteTask = async (id: any) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks?.filter((task: any) => task.id !== id));
  }

  // Toggle Reminder
  const toggleReminder = async (id: any) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask =  {...taskToToggle, reminder: !taskToToggle.reminder };

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await response.json();

    setTasks(
      tasks?.map((task) => 
        task.id === id ? {...task, reminder: data.reminder} : task
      )
    );
  }

  return (
    <div className="container">
      <Header 
        onAdd={() => 
          setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {(tasks.length) > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show'}
    </div>
  );
}

export default App;
