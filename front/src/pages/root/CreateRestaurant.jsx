import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import ValidateButton from "../../components/ValidateButton";
import RootBackButton from "../../components/RootBackButton";

const PATH = import.meta.env.VITE_PATH;

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
      const response = await fetch(PATH + "/root/panel/restaurants/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createRestaurantForm),
      });

      const errorData = await response.json();
      if (errorData.status === false) {
        throw new Error(errorData.error.message);
      }
      console.log("Création de restaurant réussie");
    } catch (error) {
      console.error("Erreur", error.message);
    }
  };
  return (
    <section className="flex flex-col items-center">
      <div>
        <RootBackButton />
        <h2>Ajouter un restaurant</h2>
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleCreateRestaurantSubmit}
      >
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder="Nom du restaurant"
            name="name"
            onChange={handleCreateRestaurant}
          />
        </div>

        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="number"
            placeholder="Id_owner"
            name="id_owner"
            onChange={handleCreateRestaurant}
          />
        </div>
        <div className="flex items-center space-y-4 w-full pt-4">
          <ValidateButton className="space-y-2" label="Create" />
        </div>
      </form>
    </section>
  );
}
