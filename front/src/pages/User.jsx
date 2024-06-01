import React, { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";

const PATH = import.meta.env.VITE_PATH;

export default function User() {
  const [userDetails, setUserDetails] = useState(null);
  const [userBookings, setUserBookings] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      fetch(PATH + "/user", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching user details");
          }
          return response.json();
        })
        .then((data) => {
          const userData = data.data;
          setUserDetails(userData);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, []);


  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      fetch(PATH + "/user/bookings", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching user bookings");
          }
          return response.json();
        })
        .then((data) => {
          const userData = data.data;
          setUserBookings(userData);
        })
        .catch((error) => console.error("Error fetching user bookings:", error));
    }
  }, []);

  return (
    
      <section className="m-10">
        <div className="flex justify-center items-center m-10">
          <h2 className="text-5xl">Les HappyRest'O</h2>
          <LogoutButton />
        </div>
        <div className="flex justify-center items-center m-10">
          <h4 className="text-2xl">User Details</h4>
        </div>

        <div className="overflow-x-auto m-5">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-2xl">
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Firstname</th>
                <th className="border px-4 py-2">Lastname</th>
                <th className="border px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {userDetails && (
                <tr className="text-xl">
                  <td className="border px-4 py-2">{userDetails.email}</td>
                  <td className="border px-4 py-2">{userDetails.firstName}</td>
                  <td className="border px-4 py-2">{userDetails.lastName}</td>
                  <td className="border px-4 py-2">{userDetails.role}</td>
                </tr>
              )}
            </tbody>
          </table>
          
          <br />
          <br />

          {userBookings && (
            <table>
              <thead>
                <tr>
                  <th className="border px-4 py-2">Restaurant</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Pax</th>
                </tr>
              </thead>
              <tbody>
                {userBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border px-4 py-2">
                      {booking.id_restaurant}
                    </td>
                    <td className="border px-4 py-2">{booking.date}</td>
                    <td className="border px-4 py-2">{booking.pax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
  
  );
}
