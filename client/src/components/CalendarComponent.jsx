import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {
  
  const [date, setDate] = useState(new Date())
  

  const onChange = date => {
    setDate(date);
  }

  return (
    <div className="calendar">

  <Calendar onChange={onChange} date={date} />
          {console.log(date)}
          {/* {date.toString()} */}



    </div>
  );
}

