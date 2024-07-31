// // components/Calendar.js
// import { useState } from 'react';
// import { format, addDays, subDays } from 'date-fns';
// import styles from '../components/Calendar/Calendar.module.css'

// const Calendar = ({ selectedDate, onDateChange }) => {
//   return (
//     <div className="flex justify-center items-center mb-4">
//       <button onClick={() => onDateChange(subDays(selectedDate, 1))}>←</button>
//       <h2 className="mx-4 text-xl">{format(selectedDate, 'PPP')}</h2>
//       <button onClick={() => onDateChange(addDays(selectedDate, 1))}>→</button>
//     </div>
//   );
// };

// export default Calendar;


// components/Calendar.js
// import { useState, useEffect } from 'react';
// import { format, startOfWeek, addDays, subWeeks, addWeeks, isSameDay } from 'date-fns';

// const Calendar = ({ selectedDate, onDateChange }) => {
//   const [currentWeek, setCurrentWeek] = useState(startOfWeek(selectedDate, { weekStartsOn: 1 }));

//   useEffect(() => {
//     setCurrentWeek(startOfWeek(selectedDate, { weekStartsOn: 1 }));
//   }, [selectedDate]);

//   const renderDaysOfWeek = () => {
//     const days = [];
//     for (let i = 0; i < 7; i++) {
//       const day = addDays(currentWeek, i);
//       days.push(
//         <div
//           key={i}
//           className={`p-2 mx-1 text-center cursor-pointer ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''}`}
//           onClick={() => onDateChange(day)}
//         >
//           <p className="font-semibold">{format(day, 'EEE')}</p>
//           <p>{format(day, 'd')}</p>
//         </div>
//       );
//     }
//     return days;
//   };

//   return (
//     <div className="flex flex-col items-center mb-4">
//       <div className="flex justify-between w-full mb-2">
//         <button onClick={() => onDateChange(subWeeks(currentWeek, 1))}>← Previous Week</button>
//         <h2 className="mx-4 text-xl">{format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}</h2>
//         <button onClick={() => onDateChange(addWeeks(currentWeek, 1))}>Next Week →</button>
//       </div>
//       <div className="flex justify-around w-full">{renderDaysOfWeek()}</div>
//     </div>
//   );
// };

// export default Calendar;

// // components/Calendar.js
// import { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { startOfWeek, addDays, isSameDay, format } from 'date-fns';
// import styles from './Calendar.module.css';

// const CustomCalendar = ({ selectedDate, onDateChange }) => {
//   const [date, setDate] = useState(selectedDate);

//   useEffect(() => {
//     setDate(selectedDate);
//   }, [selectedDate]);

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     onDateChange(newDate);
//   };

//   const tileDisabled = ({ date, view }) => {
//     // Disable all dates except those in the current week
//     if (view === 'month') {
//       const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
//       const end = addDays(start, 6);
//       return date < start || date > end;
//     }
//     return false;
//   };

//   const formatShortWeekday = (locale, date) => {
//     const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
//     const end = addDays(start, 6);
//     return date >= start && date <= end ? format(date, 'E') : '';
//   };

//   return (
//     <div className="flex flex-col items-center mb-4">
//       <h2 className="text-xl mb-4">{format(selectedDate, 'PPP')}</h2>
//       <Calendar
//         onChange={handleDateChange}
//         value={date}
//         tileDisabled={tileDisabled}
//         formatShortWeekday={formatShortWeekday}
//         showNeighboringMonth={false}
//       />
//     </div>
//   );
// };

// export default CustomCalendar;

// components/Calendar.js
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Calendar.module.css'; 
import { startOfWeek, addDays, isSameDay, format } from 'date-fns';

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
