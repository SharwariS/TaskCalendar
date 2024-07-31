// components/Calendar.js
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css'; 
import { startOfWeek, addDays, format } from 'date-fns';

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  const [date, setDate] = useState(selectedDate);

  useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  const tileDisabled = ({ date, view }) => {
    // Disable all dates except those in the current week
    if (view === 'month') {
      const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
      const end = addDays(start, 6);
      return date < start || date > end;
    }
    return false;
  };

  const formatShortWeekday = (locale, date) => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = addDays(start, 6);
    return date >= start && date <= end ? format(date, 'E') : '';
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <h2 className="date">{format(selectedDate, 'PPP')}</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileDisabled={tileDisabled}
        formatShortWeekday={formatShortWeekday}
        showNeighboringMonth={false}
        className={styles.reactCalendar}
      />
    </div>
  );
};

export default CustomCalendar;
