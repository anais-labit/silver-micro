import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import ValidateButton from "../../components/ValidateButton";
import RootBackButton from "../../components/RootBackButton";
import SelectInput from "../../components/Select";

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
    <section className="flex flex-col items-center">
      <div>
        <RootBackButton />
        <h2>Ajouter un user</h2>
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleCreateUserSubmit}
      >
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleCreateUser}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder="Nom"
            name="lastName"
            onChange={handleCreateUser}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder="Prénom"
            name="firstName"
            onChange={handleCreateUser}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <SelectInput
            name="role"
            onChange={handleCreateUser}
            options={[
              { value: "owner", label: "Propriétaire" },
              { value: "user", label: "Client" },
            ]}
          />
        </div>
        <div className="flex items-center space-y-4 w-full pt-4">
          <ValidateButton className="space-y-2" label="Créer" />
        </div>
      </form>
    </section>
  );
}
