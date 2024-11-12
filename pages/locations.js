// pages/index.js
import Calendar from "./components/calendar.js";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "./api/firebaseClient";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./api/firebaseClient";
import { useMemo } from "react";
import dynamic from "next/dynamic.js";
export default function Locations() {
    const Map = useMemo(
        () =>
          dynamic(() => import("./components/geomap"), {
            loading: () => <p>A map is loading</p>,
            ssr: false,
          }),
        []
      );
    const [playgrounds, setPlaygrounds] = useState([]);

    const handleClick = async () => {
        
      };
      const fetchPlaygrounds = async () => {
        const querySnapshot = await getDocs(collection(db, "fields"));
        const fetchedplaygrounds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().Name,
          location: [doc.data().Location.latitude, doc.data().Location.longitude],
        }));
        setPlaygrounds(fetchedplaygrounds);
        console.log(fetchedplaygrounds)
      };
      useEffect(() => {
        fetchPlaygrounds();
      }, []);
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Výber ihrísk</h2>
      <Map playgrounds={playgrounds} handleClick={handleClick} />
    </div>
  );
}
