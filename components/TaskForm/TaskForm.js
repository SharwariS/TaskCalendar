//components/TaskForm.js
import React, { useState } from 'react';
import { addTask } from '../../helpers/firebaseHelpers';
import { useUserId } from '../../context/UserContext';
import styles from'./TaskForm.module.css';

const TaskForm = ({ selectedDate }) => {
  const userId = useUserId();
  const [text, setText] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!selectedDate || !userId) {
      console.error('Selected Date or User ID is missing');
      return;
    }
    await addTask(text, selectedDate, userId);
    setText('');
  };

  return (
    <form onSubmit={handleAddTask} className={styles.addTaskForm}>
      <input
        type="text"
        placeholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
