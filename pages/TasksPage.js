// pages/TasksPage.js
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import TaskList from '../components/TaskList/TaskList';
import TaskForm from '../components/TaskForm/TaskForm';
import Calendar from '../components/Calendar/Calendar';

const TasksPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, loading, error] = useAuthState(auth); // Using useAuthState to get user info

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Please log in to view your tasks.</div>;
  }

  // Function to handle date change
  const handleDateChange = (newDate) => {
    console.log("Date in TasksPage file: ", newDate);
    setSelectedDate(newDate);
  };

  console.log('Rendering TasksPage with selectedDate: ', selectedDate);
  console.log('is newDate variable different?: ', newDate);

  return (
    <div>
      <h1>Task Management</h1>
      <div>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate.toISOString().substring(0, 10)}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </div>
      <Calendar selectedDate={selectedDate} onDateChange={handleDateChange} />
      <TaskForm selectedDate={selectedDate} />
      <TaskList selectedDate={selectedDate} />
    </div>
  );
};

export default TasksPage;
