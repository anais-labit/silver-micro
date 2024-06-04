import Card from "../../components/Card";
import passetemps from "../../assets/restoimg/passe-temps.jpg";
import bellavita from "../../assets/restoimg/bellavita.jpg";
import random from "../../assets/restoimg/random.jpg";
import traditions from "../../assets/restoimg/traditions.jpg";
import { Link } from "react-router-dom";
import UserMenu from "../../components/UserMenu";
import { useEffect, useState } from "react";

const PATH = import.meta.env.VITE_PATH;

const imageMapping = {
	"Passe-temps": passetemps,
	Bellavita: bellavita,
};

export default function RestaurantsList() {
	const [restaurantsData, setrestaurantsData] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		const jwtToken = localStorage.getItem("jwtToken");

		if (jwtToken) {
			fetch(PATH + "/user/restaurants", {
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(
							`Error fetching restaurants details: ${response.status} ${response.statusText}`
						);
					}
					return response.json();
				})
				.then((data) => {
					const fetchData = data.data.map((restaurant) => ({
						...restaurant,
						tags: restaurant.tags
							? Array.isArray(restaurant.tags)
								? restaurant.tags
								: [restaurant.tags]
							: [],
					}));
					setrestaurantsData(fetchData);
				})
				.catch((error) =>
					console.error("Error fetching restaurants details:", error)
				);
		} else {
			console.error("JWT token is not available in localStorage");
		}
	}, []);

	return (
		<section>
			<div className="flex justify-end items-end p-5">
				<UserMenu />
			</div>
			<div className="flex justify-center items-center m-10">
				<h2 className="text-5xl font-bold">Les HappyRest'O</h2>
			</div>

			<div className="flex items-center justify-center max-sm:flex-col">
				{restaurantsData.length > 0 ? (
					restaurantsData.map((restaurant) => {
						const jsonTags = restaurant.tags;
						const restaurantImage = imageMapping[restaurant.name] || random;

						return (
							<div className="flex max-sm:m-5 lg:m-10" key={restaurant.id}>
								<Link to={`/restaurants/${restaurant.name}`}>
									<Card
										title={restaurant.name}
										img={restaurantImage}
										adresse={restaurant.address}
										// note="4.5/5"
										tags={jsonTags}
									/>
								</Link>
							</div>
						);
					})
				) : (
					<p>No restaurants available.</p>
				)}
			</div>
		</section>
	);
}
