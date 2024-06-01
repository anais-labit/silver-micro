import React, { useState, useEffect } from "react";
import UserMenu from "../components/UserMenu";

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
				.catch((error) =>
					console.error("Error fetching user bookings:", error)
				);
		}
	}, []);

	const formatDate = (dateString) => {
		const options = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString)
			.toLocaleDateString("fr-FR", options)
			.replace(",", "");
	};

	return (
		<section className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
			<div className="flex w-full justify-between items-center p-5 bg-white shadow-md rounded-md">
				<div className="text-2xl font-semibold text-gray-800">
					Détails de l'utilisateur
				</div>
				<UserMenu />
			</div>
			<div className="mt-8 w-full max-w-6xl bg-white shadow-md rounded-md p-6">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">
					Informations Personnelles
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-200">
								<th className="border px-4 py-2">Email</th>
								<th className="border px-4 py-2">Prénom</th>
								<th className="border px-4 py-2">Nom</th>
								<th className="border px-4 py-2">Rôle</th>
							</tr>
						</thead>
						<tbody>
							{userDetails && (
								<tr className="hover:bg-gray-100 transition">
									<td className="border px-4 py-2">{userDetails.email}</td>
									<td className="border px-4 py-2">{userDetails.firstName}</td>
									<td className="border px-4 py-2">{userDetails.lastName}</td>
									<td className="border px-4 py-2">{userDetails.role}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				{userDetails && userDetails.role === "user" && (
					<div className="mt-8">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							Réservations
						</h2>
						<div className="overflow-x-auto">
							{userBookings ? (
								<table className="w-full table-auto">
									<thead>
										<tr className="bg-gray-200">
											<th className="border px-4 py-2">Restaurant</th>
											<th className="border px-4 py-2">Date</th>
											<th className="border px-4 py-2">Pax</th>
										</tr>
									</thead>
									<tbody>
										{userBookings.map((booking) => (
											<tr
												key={booking.id}
												className="hover:bg-gray-100 transition">
												<td className="border px-4 py-2">
													{booking.id_restaurant}
												</td>
												<td className="border px-4 py-2">
													{formatDate(booking.date)}
												</td>
												<td className="border px-4 py-2">{booking.pax}</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p className="text-gray-600">Aucune réservation trouvée.</p>
							)}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
