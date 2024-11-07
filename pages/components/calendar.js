// components/Calendar.js
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { db } from '../api/firebaseClient';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import interactionPlugin from '@fullcalendar/interaction'; // Import interaction plugin
import timeGridPlugin from '@fullcalendar/timegrid';
const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState("Risko");

  
  // Fetch events from Firestore
  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, 'reservations'));
    const fetchedEvents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      title: doc.data().title,
      start: doc.data().start.toDate(),
      end: doc.data().end.toDate(),
    }));
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle booking a slot
  const handleBooking = async (info) => {
    const title = prompt('Enter your name for the booking:');
    if (title) {
      const startTime = new Date(info.dateStr);
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);      
   
        await addDoc(collection(db, 'reservations'), {
          title,
          start: startTime,
          end: endTime,
        });
        fetchEvents();
      }
    
  };

  return (
    <div>
      <h1>Pitch Reservation System</h1>

  

      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin]}
        initialView= 'timeGridWeek'
        events={events}
        dateClick={handleBooking}
        slotMinTime="08:00:00" // Optional: Set the earliest time available for booking
        slotMaxTime="24:00:00"
      />
    </div>
  );
};

export default Calendar;
