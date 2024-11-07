// components/Calendar.js
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin
import timeGridPlugin from '@fullcalendar/timegrid';
const Calendar = ({ events , handleClick}) => {
  

  return (
    <div>
      <h1>Pitch Reservation System</h1>

  

      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin]}
        initialView= 'timeGridWeek'
        events={events}
        dateClick={handleClick}
        slotMinTime="00:00:00" // Optional: Set the earliest time available for booking
        slotMaxTime="24:00:00"
      />
    </div>
  );
};

export default Calendar;
