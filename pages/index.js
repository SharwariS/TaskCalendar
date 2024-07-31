// pages/index.js
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import TaskList from '../components/TaskList/TaskList';
import CustomCalendar from '../components/Calendar/Calendar';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4" style={{textAlign: "center"}}>
        <h1 className="text-2xl">Task Calendar</h1>
        {/* <button onClick={() => auth.signOut()} className="p-2 bg-red-500 text-white">Logout</button> */}
      </div>
      <CustomCalendar selectedDate={selectedDate} onDateChange={setSelectedDate}/>
      {/* <TaskForm /> */}
      <TaskList selectedDate={selectedDate} />
      <button onClick={() => auth.signOut()} className="p-2 bg-red-500 text-white">Logout</button>
    </div>
  );
}
