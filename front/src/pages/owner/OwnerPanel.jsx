import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserMenu from "../../components/UserMenu";

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

	const handleDelete = (restaurantId) => {
		// Implement delete logic
	};

	const handleValidate = (bookingId) => {
		// Implement validate logic
	};

	const handleDecline = (bookingId) => {
		// Implement decline logic
	};

	return (
		<section className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
			<div className="flex w-full justify-between p-5 bg-white shadow-md rounded-md">
				<div>
					<div className="text-2xl font-semibold text-gray-800">
						{showRestaurants
							? "Gestion des Restaurants"
							: "Gestion des Réservations"}
					</div>
				</div>
				<UserMenu />
			</div>
			<div className="flex justify-between items-center mt-8 w-full max-w-8xl">
				<button
					onClick={handleToggleView}
					className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
					{showRestaurants
						? "Voir la liste des bookings"
						: "Voir la liste des restaurants"}
				</button>
			</div>
			<div className="mt-8 bg-white shadow-md rounded-md p-6 w-full max-w-8xl">
				{showRestaurants ? (
					<div className="overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-200">
									<th className="border px-4 py-2">Nom</th>
									<th className="border px-4 py-2">Action</th>
								</tr>
							</thead>
							<tbody>
								{restaurants.map((restaurant) => (
									<tr
										key={restaurant.id}
										className="hover:bg-gray-100 transition">
										<td className="border px-4 py-2">{restaurant.name}</td>
										<td className="border px-4 py-2">
											<button
												onClick={() => handleEdit(restaurant.id)}
												className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition">
												Modifier
											</button>
											<button
												onClick={() => handleDelete(restaurant.id)}
												className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-red-600 transition">
												Supprimer
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-200">
									<th className="border px-4 py-2">Restaurant</th>
									<th className="border px-4 py-2">Date</th>
									<th className="border px-4 py-2">Pax</th>
									<th className="border px-4 py-2">Action</th>
								</tr>
							</thead>
							<tbody>
								{bookings.map((booking) => (
									<tr key={booking.id} className="hover:bg-gray-100 transition">
										<td className="border px-4 py-2">
											{booking.id_restaurant}
										</td>
										<td className="border px-4 py-2">{booking.date}</td>
										<td className="border px-4 py-2">{booking.pax}</td>
										<td className="border px-4 py-2">
											<button
												onClick={() => handleValidate(booking.id)}
												className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition">
												Valider
											</button>
											<button
												onClick={() => handleDecline(booking.id)}
												className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-red-600 transition">
												Refuser
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</section>
	);
}
