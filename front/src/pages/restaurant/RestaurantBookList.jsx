import React, { useState, useEffect } from 'react';
import BackButton from "../../components/BackButton";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function RestaurantBookList() {
    const jours = [
        "Lun",
        "Mar",
        "Mer",
        "Jeu",
        "Ven",
        "Sam",
        "Dim"
    ];

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

    const personnes = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
    ];

    const [displayState, setDisplayState] = useState("JOURS");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState(null);
    const [selectedPeople, setSelectedPeople] = useState(null);
    const [bookings, setBookings] = useState([]); // [date, heure, personnes]


    useEffect(() => {
        console.log("Réservations mises à jour :", bookings);
    }, [bookings]);

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setDisplayState("HEURES");
    };

    const handleHourClick = (heure) => {
        setSelectedHour(heure);
        setDisplayState("PERSONNES");
    };

    const handleButtonClick = (state) => {
        setDisplayState(state);
        // Réinitialiser les sélections lorsqu'on change d'étape
        if (state === "JOURS") {
            setSelectedDate(new Date());
        } else {
            setSelectedHour(null);
            setSelectedPeople(null);
        }
    };

    const handleBookingConfirm = () => {
        // Vérifier si toutes les informations nécessaires ont été sélectionnées
        if (selectedDate && selectedHour && selectedPeople) {
            // Créer un nouvel objet représentant la réservation
            const newBooking = {
                date: selectedDate,
                hour: selectedHour,
                people: selectedPeople
            };
            // Ajouter la nouvelle réservation à l'état des réservations
            setBookings([...bookings, newBooking]);
            // Réinitialiser les sélections pour permettre une nouvelle réservation
            setSelectedDate(new Date());
            setSelectedHour(null);
            setSelectedPeople(null);
            setDisplayState("JOURS"); // Revenir à l'étape de sélection de la date
        } else {
            // Afficher un message d'erreur ou demander à l'utilisateur de sélectionner toutes les informations nécessaires
            console.log("Veuillez sélectionner une date, une heure et un nombre de personnes.");
        }
    };

    const formattedDate = jours[selectedDate.getDay() - 1] + " " + selectedDate.getDate() + " " + selectedDate.toLocaleString('default', { month: 'long' });

    return (
        <>
            <div className='m-5'>
                <BackButton />
            </div>
            <div className='flex justify-center mb-5'>
                <h1 className='text-xl font-bold'>Select a date</h1>
            </div>

            <div className='grid grid-cols-3 justify-center items-center gap-4 m-5 my-16'>
                <div className="border-black border-2 p-2 flex justify-center">
                    <button onClick={() => handleButtonClick("JOURS")}>{formattedDate}</button>
                </div>
                <div className="border-black border-2 p-2 flex justify-center">
                    <button onClick={() => handleButtonClick("HEURES")}>{selectedHour || "HEURES"}</button>
                </div>
                <div className="border-black border-2 p-2 flex justify-center">
                    <button onClick={() => handleButtonClick("PERSONNES")}>{selectedPeople || "PERS"}</button>
                </div>
            </div>

            {displayState === "JOURS" && (
                <div className="m-5 flex justify-center">
                    <Calendar
                        onChange={date => handleDayClick(date)}
                        value={selectedDate}
                    />
                </div>
            )}

            {displayState === "HEURES" && (
                <div className="m-5">

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

            {displayState === "PERSONNES" && (
                <div className="m-5">
                    <div className="m-5 grid grid-cols-4 gap-4">
                        {personnes.map((personne, personneIndex) => (
                            <button
                                className="border-black border-2"
                                onClick={() => setSelectedPeople(personne)}
                                key={personneIndex}
                            >
                                {personne}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Bouton de confirmation */}
            {displayState === "PERSONNES" && (
                <div className="m-5 my-48">
                    <div className='flex font-bold text-xl m-5 justify-center'>
                        <p> le {formattedDate} à {selectedHour} pour {selectedPeople} pers</p>
                    </div>
                    <button onClick={handleBookingConfirm} className='bg-black px-3 pb-1 text-white rounded-xl text-xl w-full'>Confirmer la réservation</button>
                </div>
            )}
        </>
    );
}
