// components/TaskList.js
import { useState, useEffect } from 'react';
import { fetchTasks } from '../../helpers/firebaseHelpers';
import { useUserId } from '../../context/UserContext';
import TaskForm from '../TaskForm/TaskForm';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.css'

const TaskList = ({ selectedDate }) => {
  const userId = useUserId();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!selectedDate || !userId) {
      console.error('Selected Date or User ID is not available');
      return;
    }
    const unsubscribe = fetchTasks(selectedDate, userId, setTasks);
    return () => unsubscribe();
  }, [selectedDate, userId]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'notCompleted') return !task.completed;
    if (filter === 'postponed') return task.date !== selectedDate; // Assuming postponed tasks have different dates
    if (filter === 'canceled') return task.canceled; // Assuming canceled tasks have a 'canceled' property
    return true;
  });

  return (
    <div>
      <TaskForm selectedDate={selectedDate} />
      <div className={styles.filterTasks}>
        <label htmlFor="filter" className={styles.filterTasksLabel}>Filter tasks</label>
        <select
          id="filter"
          className={styles.filterTasksDropdown}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
          <option value="postponed">Postponed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
