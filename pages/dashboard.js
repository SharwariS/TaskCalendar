// pages/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase/firebaseConfig';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchTasks = async () => {
      const user = auth.currentUser;
      if (user) {
        const tasksSnapshot = await db.collection('tasks').where('userId', '==', user.uid).get();
        setTasks(tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const newTask = { text: task, completed: false, userId: user.uid };
      await db.collection('tasks').add(newTask);
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };

  const removeTask = async (id) => {
    await db.collection('tasks').doc(id).delete();
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = async (id, completed) => {
    await db.collection('tasks').doc(id).update({ completed: !completed });
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl">Task Calendar</h1>
      <form onSubmit={addTask} className="flex space-x-2 my-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 flex-grow"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center my-2">
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleComplete(task.id, task.completed)}
                className={`p-2 ${task.completed ? 'bg-green-500' : 'bg-gray-500'} text-white`}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => removeTask(task.id)}
                className="bg-red-500 text-white p-2"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
