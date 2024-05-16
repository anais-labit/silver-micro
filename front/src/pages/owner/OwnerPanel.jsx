import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import RestaurantDetails from "../restaurant/RestaurantDetails";

const PATH = import.meta.env.VITE_PATH;

export default function OwnerPanel() {
  const [restaurants, setRestaurants] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      fetch(PATH + "/owner/panel/restaurants", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching restaurants");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetch result:", data.data);
          const restaurantsData = data.data;
          setRestaurants(restaurantsData);
        })
        .catch((error) => console.error("Error fetching restaurants:", error));
    }
  }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      fetch(PATH + "/owner/panel/bookings", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching bookings");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetch result:", data.data);
          const usersData = data.data;
          setBookings(usersData);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, []);

  const handleToggleView = () => {
    setShowRestaurants(!showRestaurants);
  };

  const handleEdit = (restaurantId) => {
    window.location.href = `/owner/panel/restaurants/update/${restaurantId}`;
  };

  return (
    <>
      <section>
        <div className="flex justify-center items-center m-10">
          <h2 className="text-3xl">Les Rest'O</h2>
          <LogoutButton />
        </div>
        <div className="flex justify-between items-center m-5">
          <button onClick={handleToggleView}>
            {showRestaurants
              ? "Voir la liste des bookings"
              : "Voir la liste des restaurants"}
          </button>
        </div>
        {showRestaurants ? (
          <div className="overflow-x-auto m-5">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.id}>
                    <td className="border px-4 py-2">{restaurant.name}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleEdit(restaurant.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(restaurant.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto m-5">
            <table>
              <thead>
                <tr>
                  <th className="border px-4 py-2">Restaurant</th>
                  <th className="border px-4 py-2">Start</th>
                  <th className="border px-4 py-2">End</th>
                  <th className="border px-4 py-2">Pax</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border px-4 py-2">
                      {booking.id_restaurant}
                    </td>
                    <td className="border px-4 py-2">{booking.start}</td>
                    <td className="border px-4 py-2">{booking.end}</td>
                    <td className="border px-4 py-2">{booking.pax}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleValidate(booking.id)}>
                        Validate
                      </button>
                      <button onClick={() => handleDecline(booking.id)}>
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
