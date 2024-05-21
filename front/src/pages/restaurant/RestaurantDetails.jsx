import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Booking from "../../components/Booking";
import traditions2 from "../../assets/restoimg/traditions2.jpg";
import bellavita2 from "../../assets/restoimg/bellavita2.jpg";
import passetemps2 from "../../assets/restoimg/passe-temps2.jpg";
import heart from "../../assets/heart.png";
import heartLiked from "../../assets/liked.png";
import pin from "../../assets/marqueur.png";

const images = {
  traditions: traditions2,
  bellavita: bellavita2,
  "passe-temps": passetemps2,
};

const RestoDetails = {
  menu: {
    entrées: [
      { nom: "salade de chèvre chaud", prix: 8 },
      { nom: "salade niçoise", prix: 10 },
      { nom: "salade césar", prix: 12 },
      { nom: "salade de tomates", prix: 8 },
    ],
    plats: [
      { nom: "Coq au Vin", prix: 28 },
      { nom: "Cassoulet Maison", prix: 28 },
    ],
    desserts: [
      { nom: "Plateau de Fromages Affinés", prix: 14 },
      { nom: "Tarte Tatin Maison", prix: 12 },
      { nom: "Crème Brûlée à la Lavande", prix: 12 },
    ],
  },
};

export default function RestaurantDetails() {
  const { title } = useParams();
  const [liked, setLiked] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const jwtToken = localStorage.getItem("jwtToken");
        const response = await fetch(`${PATH}/user/restaurants/${title}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        const data = await response.json();
        setRestaurantData(data.data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching restaurant infos:", error);
      }
    };

    fetchRestaurantData();
  }, [title]);

  const handleLike = () => {
    setLiked(!liked);
    console.log("liked", liked);
  };

  return (
    <section>
      <div className="flex w-full justify-between p-5">
        <div>
          <BackButton />
        </div>
        <div>
          <UserCard />
        </div>
      </div>
      <div className="w-full">
        <img
          src={images[title]}
          alt={restaurantData.name}
          className="h-96 w-full object-cover object-center"
        />
      </div>

      <div className="flex justify-between my-10 lg:mx-36">
        <div className="flex flex-col max-sm:w-full lg:w-1/2 gap-8 max-sm:m-5">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full px-2 items-center">
              <div>
                <h2 className="text-3xl uppercase font-bold">
                  {restaurantData.name}
                </h2>
              </div>
              <div className="relative">
                <button onClick={handleLike} className="max-sm:hidden lg:flex">
                  <img
                    src={liked ? heartLiked : heart}
                    className="h-8 w-8 hover:scale-150 duration-500"
                  />
                </button>

                <Link to={`/restaurants/${title}/books`}>
                  <button className="max-sm:flex lg:hidden bg-black px-3 pb-1 text-white rounded-xl text-xl">
                    Réserver
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex items-center my-2 gap-2">
              <img src={pin} className="h-5 w-5" />
              <p>{restaurantData.address}</p>
            </div>
            <p className="text-xl text-justify">{restaurantData.description}</p>
          </div>

          <div className="flex flex-col p-5 gap-8 text-xl">
            <h2 className="text-2xl font-bold">Menu :</h2>
            <div className="ml-5">
              <h3 className="font-semibold">Entrées :</h3>
              <ul className="ml-5">
                {RestoDetails.menu.entrées.map((plat, index) => (
                  <li key={index}>
                    {plat.nom} - {plat.prix} €
                  </li>
                ))}
              </ul>
            </div>

            <div className="ml-5">
              <h3 className="font-semibold">Plats :</h3>
              <ul className="ml-5">
                {RestoDetails.menu.plats.map((plat, index) => (
                  <li key={index}>
                    {plat.nom} - {plat.prix} €
                  </li>
                ))}
              </ul>
            </div>
            <div className="ml-5">
              <h3 className="font-semibold">Desserts :</h3>
              <ul className="ml-5">
                {RestoDetails.menu.desserts.map((plat, index) => (
                  <li key={index}>
                    {plat.nom} - {plat.prix} €
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-sm:hidden lg:flex mt-[-15%]">
          <Booking />
        </div>
      </div>
    </section>
  );
}
