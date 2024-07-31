// pages/TasksPage.js
import { useAuth } from '../hooks/useAuth'; // Example hook for auth
import { useState } from 'react';
import { format } from 'date-fns';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm/TaskForm';
import Calendar from '../components/Calendar';

const TasksPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth(); // Assuming useAuth provides user info
//   const [currentUserId, setCurrentUserId] = useState('user123'); // Replace with actual user ID logic

  if (!user) {
    return <div>Please log in to view your tasks.</div>;
  }

  // Function to handle date change
  const handleDateChange = (newDate) => {
    console.log("Date in TasksPage file: ", newDate);
    // setSelectedDate(new Date(newDate));
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
