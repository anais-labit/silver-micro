import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import ValidateButton from "../../components/ValidateButton";
import RootBackButton from "../../components/RootBackButton";
import UserMenu from "../../components/UserMenu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PATH = import.meta.env.VITE_PATH;
const MySwal = withReactContent(Swal);

export default function CreateRestaurant() {
	const [createRestaurantForm, setCreateRestaurantForm] = useState({
		name: "",
		id_owner: null,
	});

	const handleCreateRestaurant = (e) => {
		const { name, value } = e.target;
		const parsedValue = name === "id_owner" ? parseInt(value) : value;
		setCreateRestaurantForm((prevState) => ({
			...prevState,
			[name]: parsedValue,
		}));
	};

	const handleCreateRestaurantSubmit = async (e) => {
		e.preventDefault();

		try {
			const jwtToken = localStorage.getItem("jwtToken");

			const response = await fetch(PATH + "/root/panel/restaurants/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwtToken}`,
				},
				body: JSON.stringify(createRestaurantForm),
			});

			const data = await response.json();

			if (data.status === false) {
				throw new Error(data.error.message);
			}
			console.log("Création de restaurant réussie");

			MySwal.fire({
				icon: "success",
				title: "C'est fait !",
				html: `Le restaurant <strong>${data.data.name}</strong> a été créé avec succès.`,
			});

			setTimeout(() => {
				window.location.href = "/root/panel";
			}, 2000);
		} catch (error) {
			MySwal.fire({
				icon: "error",
				title: "Erreur",
				text: error.message,
			});
			console.error("Erreur", error.message);
		}
	};

	return (
		<section className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
			<div className="flex w-full justify-between p-5 bg-white shadow-md rounded-md">
				<RootBackButton />
				<UserMenu />
			</div>
			<div className="mt-8 mb-4 text-2xl font-semibold text-gray-800">
				Ajouter un restaurant
			</div>
			<div className="flex flex-col items-center space-y-2 py-6">
				<form
					className="bg-white shadow-md rounded-md p-20 w-full max-w-lg"
					onSubmit={handleCreateRestaurantSubmit}>
					<div className="mb-4">
						<FormInput
							type="text"
							placeholder="Nom du restaurant"
							name="name"
							onChange={handleCreateRestaurant}
						/>
					</div>
					<div className="mb-4">
						<FormInput
							type="number"
							placeholder="Id_owner"
							name="id_owner"
							onChange={handleCreateRestaurant}
						/>
					</div>
					<div className="flex justify-end">
						<ValidateButton label="Créer" />
					</div>
				</form>
			</div>
		</section>
	);
}
