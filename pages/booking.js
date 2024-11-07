// pages/index.js
import Calendar from "./components/calendar.js";
import { useAuthState } from "./api/auth/authState.js";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./api/firebaseClient";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

export default function Booking() {
  const user = useAuthState();
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(0);
  console.log(user);
  if (!user) {
    //router.push("signin");
  }
  const costPerMinute = 0.25;

  const fetchEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "reservations"));
    const fetchedEvents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: "Reserved",
      start: doc.data().start.toDate(),
      end: doc.data().end.toDate(),
    }));
    setEvents(fetchedEvents);
  };
  const setStart = async (info) => {
    const startTime = new Date(info.dateStr);
    setStartDateTime(startTime.toISOString().slice(0, 16));
    setEndDateTime("");
    setDuration(0);
    setCost(0);
  };
  const sendBooking = async () => {
    await addDoc(collection(db, "reservations"), {
      title: user.uid,
      start: startTime,
      end: endTime,
    });
    fetchEvents();
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const timeString = `${String(hour).padStart(2, "0")}:${String(
          minute
        ).padStart(2, "0")}`;
        options.push(timeString);
      }
    }
    return options;
  };
  const handleStartDateTimeChange = (e) => {
    setStartDateTime(e);
    setEndDateTime("");
    setDuration(0);
    setCost(0);
  };
  const handleDurationChange = (e) => {
    console.log(e);
    setDuration(e);
    calculateEndDateTime(startDateTime, e);
  };
  const handleEndDateTimeChange = (e) => {
    setEndDateTime(e);
    calculateReservation(startDateTime, e);
  };
  const calculateEndDateTime = (start, minutes) => {
    if (!start || !minutes) return;

    const startTime = new Date(start);
    const endTime = new Date(startTime.getTime() + minutes * 60000);
    const localEndDateTime = endTime
      .toLocaleString("sv-SE", { timeZoneName: "short" })
      .slice(0, 16);
    setEndDateTime(localEndDateTime);
    setCost(minutes * costPerMinute);
  };
  const calculateReservation = (start, end) => {
    if (!start || !end) return;

    const startTime = new Date(start);
    const endTime = new Date(end);

    const diffInMinutes = Math.floor((endTime - startTime) / (1000 * 60));

    if (diffInMinutes > 0) {
      setDuration(diffInMinutes);
      setCost(diffInMinutes * costPerMinute);
    } else {
      setDuration(0);
      setCost(0);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const timeOptions = generateTimeOptions();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Reservation Form</h2>
      <Calendar events={events} handleClick={setStart} />

      <form>
        <div className="mb-3">
          <label htmlFor="startDateTime" className="form-label">
            Start Date and Time
          </label>
          <br />

          <DatePicker
            selected={startDateTime}
            onChange={handleStartDateTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={10} // Allows only 10-minute intervals
            dateFormat="MMMM d, yyyy h:mm aa"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDateTime" className="form-label">
            End Date and Time
          </label>
          <br />

          <DatePicker
            selected={endDateTime}
            onChange={handleEndDateTimeChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={10} // Allows only 10-minute intervals
            dateFormat="MMMM d, yyyy h:mm aa"
            className="form-control"
            disabled={!startDateTime}
            required
          />

          <div className="form-text">
            Set either an end date-time or a duration, and the other field will
            adjust automatically.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="duration" className="form-label">
            Duration (minutes)
          </label>
          <TimePicker
            onChange={handleDurationChange}
            value={duration}
            disableClock={true}
            format="HH:mm"
            minTime="00:10"
            className="form-control"
            maxTime="23:50"
            step={10} // This ensures 10-minute increments
            disabled={!startDateTime}
          />
          <div>
            <p>Selected Duration: {duration}</p>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Cost</label>
          <input
            type="text"
            className="form-control"
            value={cost ? `$${cost.toFixed(2)}` : ""}
            readOnly
          />
        </div>
      </form>
    </div>
  );
}
