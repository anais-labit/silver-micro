import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { Link } from "react-router-dom";
import Booking from "../../components/Booking";
import traditions2 from "../../assets/restoimg/traditions2.jpg";
import bellavita2 from "../../assets/restoimg/bellavita2.jpg";
import passetemps2 from "../../assets/restoimg/passe-temps2.jpg";
import heart from "../../assets/heart.png";
import heartLiked from "../../assets/liked.png";
import pin from "../../assets/marqueur.png";
import UserCard from "../../components/UserCard";


const images = {
    traditions: traditions2,
    bellavita: bellavita2,
    "le passe-temps": passetemps2,
};


const RestoDetails = {
    traditions: {
        title: "Traditions",
        description: "Tradition vous invite à découvrir l'essence même de la cuisine française dans un cadre rustique et convivial. Avec un engagement envers les produits locaux et de saison, notre restaurant offre une expérience gastronomique authentique, mettant en valeur les saveurs riches et variées du terroir français.",
        adress: "65 bd de Paris 13003 Marseille",
        menu: {
            "entrées": [
                { nom: "Assiette de Charcuterie Artisanale", prix: 18 },
                { nom: "Soupe à l'Oignon Gratineé", prix: 14 },

            ],
            "plats": [
                { nom: "Coq au Vin", prix: 28 },
                { nom: "Cassoulet Maison", prix: 28 }
            ],
            "desserts": [
                { nom: "Plateau de Fromages Affinés", prix: 14 },
                { nom: "Tarte Tatin Maison", prix: 12 },
                { nom: "Crème Brûlée à la Lavande", prix: 12 }
            ],
        }
    },
    bellavita: {
        title: "Bellavita",
        description: "Plongez dans l'atmosphère authentique de l'Italie à La Trattoria Bella Vita. Niché dans une charmante rue pavée, ce restaurant respire la convivialité et la chaleur méditerranéenne dès que vous franchissez ses portes. Les murs sont ornés de photos de paysages pittoresques d'Italie, tandis que des airs de musique italienne emplissent l'air, vous transportant immédiatement dans une ambiance décontractée et joyeuse.",
        adress: "65 bd de Paris 13003 Marseille",
        menu: {
            "entrées": [
                { nom: "salade de chèvre chaud", prix: 8 },
                { nom: "salade niçoise", prix: 10 },
                { nom: "salade césar", prix: 12 },
                { nom: "salade de tomates", prix: 8 }
            ],
            "plats": [
                { nom: "Coq au Vin", prix: 28 },
                { nom: "Cassoulet Maison", prix: 28 }
            ],
            "desserts": [
                { nom: "Plateau de Fromages Affinés", prix: 14 },
                { nom: "Tarte Tatin Maison", prix: 12 },
                { nom: "Crème Brûlée à la Lavande", prix: 12 }
            ],
        }
    },
    "le passe-temps": {
        title: "Le Passe-Temps",
        description: "Le Passe-Temps, un bistrot charmant au cœur de la ville, propose une cuisine fusion avec des produits frais de saison. Dans une atmosphère bohème et intime, découvrez des plats maison accompagnés d'une sélection de vins régionaux et de cocktails artisanaux. Parfait pour des moments délicieux entre amis ou des repas tranquilles en tête-à-tête.",
        adress: "65 bd de Paris 13003 Marseille",
        menu: {
            "entrées": [
                { nom: "salade de chèvre chaud", prix: 8 },
                { nom: "salade niçoise", prix: 10 },
                { nom: "salade césar", prix: 12 },
                { nom: "salade de tomates", prix: 8 }
            ],
            "plats": [
                { nom: "Coq au Vin", prix: 28 },
                { nom: "Cassoulet Maison", prix: 28 }
            ],
            "desserts": [
                { nom: "Plateau de Fromages Affinés", prix: 14 },
                { nom: "Tarte Tatin Maison", prix: 12 },
                { nom: "Crème Brûlée à la Lavande", prix: 12 }
            ],
        }
    },
};

export default function RestaurantDetails() {
    let { title } = useParams();
    const resto = RestoDetails[title];

    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        console.log("liked", liked);
    }

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
                <img src={images[title]} alt="" className="h-96 w-full object-cover object-center" />
            </div>

            <div className="flex justify-between my-10 lg:mx-36">
                <div className="flex flex-col max-sm:w-full lg:w-1/2 gap-8 max-sm:m-5">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between w-full px-2 items-center">
                            <div>
                                <h2 className="text-3xl uppercase font-bold">{resto.title}</h2>
                            </div>
                            <div className="relative">

                                <button onClick={handleLike} className="max-sm:hidden lg:flex">
                                    <img src={liked ? heartLiked : heart} className="h-8 w-8 hover:scale-150 duration-500" />
                                </button>

                                <Link to={`/restaurants/${title}/books`}>
                                    <button className='max-sm:flex lg:hidden bg-black px-3 pb-1 text-white rounded-xl text-xl'>Reserver</button>
                                </Link>
                            </div>

                        </div>

                        <div className="flex items-center my-2 gap-2">
                            <img src={pin} className="h-5 w-5" />
                            <p>{resto.adress}</p>
                        </div>
                        <p className="text-xl text-justify">{resto.description}</p>
                    </div>

                    <div className="flex flex-col p-5 gap-8 text-xl">
                        <h2 className="text-2xl font-bold">Menu :</h2>
                        <div className="ml-5">
                            <h3 className="font-semibold" >Entrées :</h3>
                            <ul className="ml-5">
                                {resto.menu.entrées.map((plat, index) => (
                                    <li key={index}>
                                        {plat.nom} - {plat.prix} €
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="ml-5">
                            <h3 className="font-semibold">Plats :</h3>
                            <ul className="ml-5">
                                {resto.menu.plats.map((plat, index) => (
                                    <li key={index}>
                                        {plat.nom} - {plat.prix} €
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="ml-5">
                            <h3 className="font-semibold">Desserts :</h3>
                            <ul className="ml-5">
                                {resto.menu.desserts.map((plat, index) => (
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
