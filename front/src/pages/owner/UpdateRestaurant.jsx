import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormInput from "../../components/FormInput";
import ValidateButton from "../../components/ValidateButton";
import OwnerBackButton from "../../components/OwnerBackButton";

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
    <section className="flex flex-col items-center">
      <div>
        <OwnerBackButton />
        <h2>
          Renseigner les informations de votre restaurant :{" "}
          {restaurantData?.name}
        </h2>
      </div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleUpdateRestaurantSubmit}
      >
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder={restaurantData?.name || "Name"}
            name="name"
            onChange={handleUpdateRestaurant}
            value={restaurantData?.name}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="number"
            placeholder={restaurantData?.pax_capacity || "Pax capacity"}
            name="pax_capacity"
            onChange={handleUpdateRestaurant}
            value={restaurantData?.pax_capacity}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder={restaurantData?.address || "Address"}
            name="address"
            onChange={handleUpdateRestaurant}
            value={restaurantData?.address}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder={restaurantData?.description || "description"}
            name="description"
            onChange={handleUpdateRestaurant}
            value={restaurantData?.description}
          />
        </div>
        <div className="flex flex-row items-center space-y-2 relative">
          <FormInput
            type="text"
            placeholder={restaurantData?.menu || "menu"}
            name="menu"
            onChange={handleUpdateRestaurant}
            value={restaurantData?.menu}
          />
        </div>
        <div className="flex items-center space-y-4 w-full pt-4">
          <ValidateButton className="space-y-2" label="Enregister" />
        </div>
      </form>
    </section>
  );
}
