import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../../components/FormInput";
import ValidateButton from "../../components/ValidateButton";
import OwnerBackButton from "../../components/OwnerBackButton";
import UserMenu from "../../components/UserMenu";

const PATH = import.meta.env.VITE_PATH;

export default function UpdateRestaurant() {
	const { restaurantId } = useParams();
	const parsedRestaurantId = parseInt(restaurantId);
	const [restaurantData, setRestaurantData] = useState();

	const [updateRestaurantForm, setUpdateRestaurantForm] = useState({
		name: "",
		id: parsedRestaurantId,
		pax_capacity: "",
		address: "",
		description: "",
		menu: "",
	});

	useEffect(() => {
		const fetchRestaurantData = async () => {
			try {
				const jwtToken = localStorage.getItem("jwtToken");
				const response = await fetch(
					`${PATH}/owner/panel/restaurants/${parsedRestaurantId}`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${jwtToken}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error("Failed to fetch restaurant data");
				}
				const restaurant = await response.json();
				setRestaurantData(restaurant?.data);
			} catch (error) {
				console.error("Error fetching restaurant data:", error.message);
			}
		};

		fetchRestaurantData();
	}, [parsedRestaurantId]);

	useEffect(() => {
		if (restaurantData) {
			setUpdateRestaurantForm({
				...updateRestaurantForm,
				name: restaurantData.name,
				pax_capacity: restaurantData.pax_capacity,
				address: restaurantData.address,
				description: restaurantData.description,
				menu: restaurantData.menu,
			});
		}
	}, [restaurantData]);

	const handleUpdateRestaurant = (e) => {
		const { name, value } = e.target;
		setUpdateRestaurantForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleUpdateRestaurantSubmit = async (e) => {
		e.preventDefault();

		try {
			const jwtToken = localStorage.getItem("jwtToken");
			const response = await fetch(
				`${PATH}/owner/panel/restaurants/update/${parsedRestaurantId}`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwtToken}`,
					},
					body: JSON.stringify(updateRestaurantForm),
				}
			);

			const errorData = await response.json();
			if (errorData.status === false) {
				throw new Error(errorData.error.message);
			}
			console.log("Mise à jour du restaurant réussie");
		} catch (error) {
			console.error("Erreur", error.message);
		}
	};

	return (
		<section className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
			<div className="flex w-full justify-between p-5 bg-white shadow-md rounded-md">
				<OwnerBackButton />
				<UserMenu />
			</div>
			<div className="mt-8 mb-4 text-2xl font-semibold text-gray-800">
				Renseigner les informations de votre restaurant : {restaurantData?.name}
			</div>
			<div className="flex flex-col items-center space-y-2 py-6">
				<form
					className="bg-white shadow-md rounded-md p-20 w-full max-w-lg"
					onSubmit={handleUpdateRestaurantSubmit}>
					<div className="mb-4">
						<FormInput
							type="text"
							placeholder={restaurantData?.name || "Nom"}
							name="name"
							onChange={handleUpdateRestaurant}
							value={updateRestaurantForm.name}
						/>
					</div>
					<div className="mb-4">
						<FormInput
							type="number"
							placeholder={restaurantData?.pax_capacity || "Capacité"}
							name="pax_capacity"
							onChange={handleUpdateRestaurant}
							value={updateRestaurantForm.pax_capacity}
						/>
					</div>
					<div className="mb-4">
						<FormInput
							type="text"
							placeholder={restaurantData?.address || "Adresse"}
							name="address"
							onChange={handleUpdateRestaurant}
							value={updateRestaurantForm.address}
						/>
					</div>
					<div className="mb-4">
						<FormInput
							type="text"
							placeholder={restaurantData?.description || "Description"}
							name="description"
							onChange={handleUpdateRestaurant}
							value={updateRestaurantForm.description}
						/>
					</div>
					<div className="mb-4">
						<FormInput
							type="text"
							placeholder={restaurantData?.menu || "Menu"}
							name="menu"
							onChange={handleUpdateRestaurant}
							value={updateRestaurantForm.menu}
						/>
					</div>
					<div className="flex justify-end">
						<ValidateButton label="Enregistrer" />
					</div>
				</form>
			</div>
		</section>
	);
}
