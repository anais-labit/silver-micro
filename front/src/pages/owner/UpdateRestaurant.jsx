import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../../components/FormInput";
import ValidateButton from "../../components/ValidateButton";
import RootBackButton from "../../components/RootBackButton";

const PATH = import.meta.env.VITE_PATH;

export default function UpdateRestaurant() {
  const { restaurantId } = useParams();
  const parsedRestaurantId = parseInt(restaurantId);

  const [UpdateRestaurantForm, setUpdateRestaurantForm] = useState({
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
        setRestaurantData(restaurant); 
      } catch (error) {
        console.error("Error fetching restaurant data:", error.message);
      }
    };

    fetchRestaurantData();
  }, [parsedRestaurantId]);

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
        `${PATH}/owner/panel/update-restaurant/${parsedRestaurantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(UpdateRestaurantForm),
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
    <section className="flex flex-col items-center">
      <div>
        <RootBackButton />
        <h2>Renseigner les informations de votre restaurant</h2>
        <p>Nom du restaurant</p>
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleUpdateRestaurantSubmit}
      >
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleUpdateRestaurant}
            value={UpdateRestaurantForm.name || ""}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="number"
            placeholder="Pax capacity"
            name="pax_capacity"
            onChange={handleUpdateRestaurant}
            value={UpdateRestaurantForm.pax_capacity || ""}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder="address"
            name="address"
            onChange={handleUpdateRestaurant}
            value={UpdateRestaurantForm.address || ""}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder="description"
            name="description"
            onChange={handleUpdateRestaurant}
            value={UpdateRestaurantForm.description || ""}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder="menu"
            name="menu"
            onChange={handleUpdateRestaurant}
            value={UpdateRestaurantForm.menu || ""}
          />
        </div>
        <div className="flex items-center space-y-4 w-full pt-4">
          <ValidateButton className="space-y-2" label="Enregister" />
        </div>
      </form>
    </section>
  );
}
