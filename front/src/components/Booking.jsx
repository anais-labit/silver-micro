import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useParams } from "react-router-dom";

const PATH = import.meta.env.VITE_PATH;

export default function Booking() {
  const { title } = useParams();

  const jours = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
  const heures = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];
  const pax = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const [displayState, setDisplayState] = useState("JOURS");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedPax, setSelectedPax] = useState(null);
  const [bookingData, setBookingData] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await fetch(`${PATH}/user/restaurants/${title}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();
        if (data && data.status) {
          setBookingData(data.data);
        } else {
          console.error("Failed to fetch restaurant data");
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurantData();
  }, [title]);

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setDisplayState("HEURES");
  };

  const handleHourClick = (heure) => {
    setSelectedHour(heure);
    setDisplayState("pax");
  };

  const handleButtonClick = (state) => {
    if (
      (state === "HEURES" && displayState === "JOURS") ||
      (state === "pax" && displayState === "HEURES")
    ) {
      setSelectedHour(null);
      setSelectedPax(null);
    }
    setDisplayState(state);
    if (state === "JOURS") {
      setSelectedDate(new Date());
    }
  };

  const handleBookingConfirm = async (e) => {
    e.preventDefault();

    if (selectedDate && selectedHour && selectedPax) {
      const adjustedDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
      const formatedDBDate =
        adjustedDate.toISOString().slice(0, 10) + " " + selectedHour;

      const bookingPayload = {
        id_user: localStorage.getItem("id"),
        id_restaurant: bookingData.id,
        hour : selectedHour,
        date: formatedDBDate,
        pax: selectedPax,
      };

      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await fetch(
          `${PATH}/user/restaurants/${title}/books`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(bookingPayload),
          }
        );

        const result = await response.json();
        if (result.status === false) {
          throw new Error(result.error.message);
        }
        console.log("Booking réussi");
        setIsConfirmed(true);
        setSelectedDate(new Date());
        setSelectedHour(null);
        setSelectedPax(null);
      } catch (error) {
        console.error("Error confirming booking:", error);
      }
    } else {
      console.log(
        "Veuillez sélectionner une date, une heure et un nombre de pax."
      );
    }
  };

  const formatedDate = `${
    jours[selectedDate.getDay() - 1]
  } ${selectedDate.getDate()} ${selectedDate.toLocaleString("default", {
    month: "long",
  })}`;

  return (
    <section className="max-sm:w-full lg:w-[420px] lg:rounded-lg h-[490px] bg-white relative shadow-lg">
      {!isConfirmed && (
        <div className="grid grid-cols-3 justify-center items-center gap-4 m-8">
          <button onClick={() => handleButtonClick("JOURS")}>
            <div className="border-2 p-2 flex justify-center uppercase">
              {formatedDate}
            </div>
          </button>
          <button onClick={() => handleButtonClick("HEURES")}>
            <div className="border-2 p-2 flex justify-center">
              {selectedHour || "HEURES"}
            </div>
          </button>
          <button onClick={() => handleButtonClick("pax")}>
            <div className="border-2 p-2 flex justify-center">
              {selectedPax || "PERS"}
            </div>
          </button>
        </div>
      )}

      {!isConfirmed && displayState === "JOURS" && (
        <div className="m-5 mt-12 flex justify-center">
          <Calendar
            onChange={(date) => handleDayClick(date)}
            value={selectedDate}
          />
        </div>
      )}

      {!isConfirmed && displayState === "HEURES" && (
        <div className="m-5 mt-16">
          <div className="grid grid-cols-3 gap-4">
            {heures.map((heure, heureIndex) => (
              <button
                className="border-black border-2"
                onClick={() => handleHourClick(heure)}
                key={heureIndex}
              >
                {heure}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isConfirmed && displayState === "pax" && (
        <div className="m-5 mt-16">
          <div className="m-5 grid grid-cols-4 gap-4">
            {pax.map((personne, personneIndex) => (
              <button
                className="border-black border-2"
                onClick={() => setSelectedPax(personne)}
                key={personneIndex}
              >
                {personne}
              </button>
            ))}
          </div>
        </div>
      )}

      {isConfirmed && (
        <div className="p-5 h-full">
          <div className="flex font-bold text-xl flex-col h-full justify-center">
            <p className="text-center ">
              Réservation confirmée pour {selectedPax} personne(s) le{" "}
              {formatedDate} à {selectedHour}.
            </p>
          </div>
        </div>
      )}

      {!isConfirmed && selectedDate && selectedHour && selectedPax && (
        <div className="absolute p-5 inset-x-0 bottom-0">
          <button
            onClick={handleBookingConfirm}
            className="bg-black px-3 pb-1 text-white rounded-xl text-xl w-full"
          >
            Confirmer la réservation
          </button>
        </div>
      )}
    </section>
  );
}
