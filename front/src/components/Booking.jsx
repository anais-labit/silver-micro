import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';

export default function Booking() {
    const { title } = useParams();

    const jours = [
        "lun",
        "mar",
        "mer",
        "jeu",
        "ven",
        "sam",
        "dim"
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
    const [bookings, setBookings] = useState({
        date: null,
        hour: null,
        people: null
    }); // [date, heure, personnes]
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        console.log("Réservations mises à jour :", bookings);
        console.log(selectedDate)
        console.log(selectedHour)
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
        // Vérifier si on avance vers une étape ultérieure
        if ((state === "HEURES" && displayState === "JOURS") || (state === "PERSONNES" && displayState === "HEURES")) {
            // Réinitialiser les sélections
            setSelectedHour(null);
            setSelectedPeople(null);
        }
        
        // Changer l'état d'affichage
        setDisplayState(state);
    
        // Réinitialiser la sélection de la date si on revient à la sélection des jours
        if (state === "JOURS") {
            setSelectedDate(new Date());
        }
    };

    const handleBookingConfirm = () => {
        // Vérifier si toutes les informations nécessaires ont été sélectionnées
        if (selectedDate && selectedHour && selectedPeople) {
            // Créer un nouvel objet représentant la réservation
            const isoDate = selectedDate.toISOString();
            // Ajouter la nouvelle réservation à l'état des réservations
            setBookings({...bookings, 
                date: isoDate,
                hour: selectedHour,
                people: selectedPeople,
                id : {title}
            });
            // Réinitialiser les sélections pour permettre une nouvelle réservation
            setSelectedDate(new Date());
            setSelectedHour(null);
            setSelectedPeople(null);
            setIsConfirmed(true); // Confirmer la réservation
            console.log(bookings)
        } else {
            // Afficher un message d'erreur ou demander à l'utilisateur de sélectionner toutes les informations nécessaires
            console.log("Veuillez sélectionner une date, une heure et un nombre de personnes.");
        }
    };

    const formattedDate = jours[selectedDate.getDay() - 1] + " " + selectedDate.getDate() + " " + selectedDate.toLocaleString('default', { month: 'long' });
    

    return (
        <section className='max-sm:w-full lg:w-[420px] lg:rounded-lg h-[490px] bg-white relative shadow-lg'>
            {!isConfirmed && (
                <div className='grid grid-cols-3 justify-center items-center gap-4 m-8'>
                    <button onClick={() => handleButtonClick("JOURS")}>
                        <div className="border-2 p-2 flex justify-center uppercase">
                        {formattedDate}
                    </div>
                    </button>
                    <button onClick={() => handleButtonClick("HEURES")}>
                        <div className="border-2 p-2 flex justify-center">
                        {selectedHour || "HEURES"}
                    </div>
                    </button>
                    <button onClick={() => handleButtonClick("PERSONNES")}>
                        <div className="border-2 p-2 flex justify-center">
                        {selectedPeople || "PERS"}
                    </div>
                    </button>
                </div>
            )}

            {!isConfirmed && displayState === "JOURS" && (
                <div className="m-5 mt-12 flex justify-center">
                    <Calendar
                        onChange={date => handleDayClick(date)}
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

            {!isConfirmed && displayState === "PERSONNES" && (
                <div className="m-5 mt-16">
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

            {isConfirmed && (
                <div className="p-5 h-full">
                    <div className='flex font-bold text-xl flex-col h-full justify-center'>
                        <p className="text-center ">Réservation confirmée pour pour {bookings?.people} personne(s) le {bookings?.date} à {bookings?.hour} .</p>
                    </div>
                </div>
            )}

            {!isConfirmed && selectedDate && selectedHour && selectedPeople && (
                

                <div className=" absolute p-5 inset-x-0 bottom-0">
                    <button onClick={handleBookingConfirm} className='bg-black px-3 pb-1 text-white rounded-xl text-xl w-full'>Confirmer la réservation</button>
                </div>
            )}
        </section>
    );
}
