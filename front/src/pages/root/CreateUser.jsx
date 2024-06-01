import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import ValidateButton from "../../components/ValidateButton";
import RootBackButton from "../../components/RootBackButton";
import SelectInput from "../../components/Select";
import UserMenu from "../../components/UserMenu";

const PATH = import.meta.env.VITE_PATH;

export default function CreateUser() {
	const [createUserForm, setCreateUserForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "ChangeThisPassword",
		role: "owner",
	});

	const handleCreateUser = (e) => {
		const { name, value } = e.target;
		setCreateUserForm((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCreateUserSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(PATH + "/root/panel/users/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(createUserForm),
			});

			const errorData = await response.json();
			if (errorData.status === false) {
				throw new Error(errorData.error.message);
			}
			console.log("Création d'utilisateur réussie");
		} catch (error) {
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
				Ajouter un utilisateur
			</div>
			<div className="flex flex-col items-center space-y-2 py-6">
				<form
					className="bg-white shadow-md rounded-md p-20 w-full max-w-lg"
					onSubmit={handleCreateUserSubmit}>
					<div className="mb-4">
						<FormInput
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleCreateUser}
						/>
					</div>
					<div className="mb-4">
						<FormInput
							type="text"
							placeholder="Nom"
							name="lastName"
							onChange={handleCreateUser}
						/>
					</div>
					<div className="mb-4">
						<FormInput
							type="text"
							placeholder="Prénom"
							name="firstName"
							onChange={handleCreateUser}
						/>
					</div>
					<div className="mb-4">
						<SelectInput
							name="role"
							onChange={handleCreateUser}
							options={[
								{ value: "owner", label: "Propriétaire" },
								{ value: "user", label: "Client" },
							]}
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
