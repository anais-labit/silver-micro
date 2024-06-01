import { useState, useEffect } from "react";
import AddButton from "../../components/AddButton";
import UserMenu from "../../components/UserMenu";

const PATH = import.meta.env.VITE_PATH;

export default function RootPanel() {
	const [restaurants, setRestaurants] = useState([]);
	const [users, setUsers] = useState([]);
	const [showRestaurants, setShowRestaurants] = useState(true);

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			fetch(PATH + "/root/panel/restaurants", {
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
			fetch(PATH + "/root/panel/users", {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error fetching users");
					}
					return response.json();
				})
				.then((data) => {
					const usersData = data.data;
					setUsers(usersData);
				})
				.catch((error) => console.error("Error fetching restaurants:", error));
		}
	}, []);

	const handleToggleView = () => {
		setShowRestaurants(!showRestaurants);
	};

	const handleAdd = () => {
		if (showRestaurants) {
			window.location.href = "/root/panel/restaurants/create";
		} else {
			window.location.href = "/root/panel/users/create";
		}
	};

	return (
		<>
			<section className="min-h-screen bg-gray-100 p-6">
				<div className="flex justify-between items-center p-5 bg-white shadow-md rounded-md">
					<div className="text-2xl font-semibold text-gray-800">
						{showRestaurants
							? "Gestion des Restaurants"
							: "Gestion des Utilisateurs"}
					</div>
					<div>
						<UserMenu />
					</div>
				</div>
				<div className="flex left items-center mt-8 ">
					<button
						onClick={handleToggleView}
						className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">
						{showRestaurants
							? "Voir la liste des utilisateurs"
							: "Voir la liste des restaurants"}
					</button>
					<div className="ml-4">
						<AddButton
							type={showRestaurants ? "restaurant" : "user"}
							onClick={handleAdd}
						/>
					</div>
				</div>
				<div className="mt-8 bg-white shadow-md rounded-md p-6">
					{showRestaurants ? (
						<div className="overflow-x-auto">
							<table className="w-full table-auto">
								<thead>
									<tr className="bg-gray-200">
										<th className="border px-4 py-2">Nom</th>
										<th className="border px-4 py-2">Propriétaire</th>
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
												{restaurant.id_owner}
											</td>
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
										<th className="border px-4 py-2">Email</th>
										<th className="border px-4 py-2">Id</th>
										<th className="border px-4 py-2">Action</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user) => (
										<tr key={user.id} className="hover:bg-gray-100 transition">
											<td className="border px-4 py-2">{user.email}</td>
											<td className="border px-4 py-2">{user.id}</td>
											<td className="border px-4 py-2">
												<button
													onClick={() => handleEdit(user.id)}
													className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 transition">
													Modifier
												</button>
												<button
													onClick={() => handleDelete(user.id)}
													className="bg-red-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-red-600 transition">
													Supprimer
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
		</>
	);
}
