// components/TaskItem.js
import React from 'react';
import { format } from 'date-fns';
import { markTaskAsCompleted, updateTask, postponeTask, cancelTask } from '../../helpers/firebaseHelpers';
import { useUserId } from '../../context/UserContext';
import styles from './TaskItem.module.css'

const TaskItem = ({ task }) => {
  const userId = useUserId();

  const handleComplete = async () => {
    if (!userId) return;
    await markTaskAsCompleted(task.id, userId);
  };

  const handleToggleCompletion = async () => {
    if (!userId) return;
    await updateTask(task.id, { completed: !task.completed });
  };

  const handlePostpone = async () => {
    if (!userId) return;
    if (task.completed) {
      alert('Cannot postpone since the task is completed');
      return;
    }
    const newDate = prompt('Enter a new date (YYYY-MM-DD):');
    if (newDate) {
      await postponeTask(task.id, new Date(newDate));
    }
  };

  const handleCancel = async () => {
    if (!userId) return;
    await cancelTask(task.id);
  };

  return (
    <div className={styles.taskItem}>
      <div className={styles.taskDetails}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleCompletion}
          className={styles.checkbox}
        />
         <span className={`${styles.taskText} ${task.completed ? styles.lineThrough : ''}`}>
          {task.text}
        </span>
        <span className={styles.taskDate}>{format(task.date.toDate(), 'PPP')}</span>
      </div>
      <div className={styles.buttonGroup}>
        {!task.completed && (
          <>
          <button onClick={handleComplete} className={`${styles.button} ${styles.completeButton}`}>
            Complete
          </button>
          <button onClick={handlePostpone} className={`${styles.button} ${styles.postponeButton}`}>
            Postpone
          </button>
          <button onClick={handleCancel} className={`${styles.button} ${styles.cancelButton}`}>
            Cancel
          </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
