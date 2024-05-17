import Card from "../../components/Card";
import passetemps from "../../assets/restoimg/passe-temps.jpg";
import bellavita from "../../assets/restoimg/bellavita.jpg";
import traditions from "../../assets/restoimg/traditions.jpg";
import { Link } from "react-router-dom";
import UserMenu from "../../components/UserMenu";
import { useEffect } from "react";

const PATH = import.meta.env.VITE_PATH;


export default function RestaurantsList() {


  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      fetch(PATH + "/pannel/restaurants", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching resaurants details");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetch result:", data);
          // const userData = data.data;
          // setUserDetails(userData);
        })
        .catch((error) => console.error("Error fetching resaurants details:", error));
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
      <div className="flex justify-center items-center m-10 max-sm:flex-col">
        <div key="passe-temps">
          <Link to="/restaurants/passe-temps">
            <Card
              title="le passe-temps"
              img={passetemps}
              adresse="65 bd de Paris"
              codePostal="13003"
            />
          </Link>
        </div>

        <div key="bellavita">
          <Link to="/restaurants/bellavita">
            <Card
              title="bellavita"
              img={bellavita}
              adresse="65 bd de Paris"
              codePostal="13003"
            />
          </Link>
        </div>

        <div key="traditions">
          <Link to="/restaurants/traditions">
            <Card
              title="traditions"
              img={traditions}
              adresse="65 bd de Paris"
              codePostal="13003"
            />
          </Link>
        </div>

        <div key="resto4">
          <Link to="/restaurants/resto4">
            <Card
              title="le passe-temps"
              img={passetemps}
              adresse="65 bd de Paris"
              codePostal="13003"
            />
          </Link>
        </div>

        <div key="resto5">
          <Link to="/restaurants/resto5">
            <Card
              title="le passe-temps"
              img={passetemps}
              adresse="65 bd de Paris"
              codePostal="13003"
            />
          </Link>
        </div>

        <div key="resto6">
          <Link to="/restaurants/resto6">
            <Card
              title="le passe-temps"
              img={passetemps}
              adresse="65 bd de Paris"
              codePostal="13003"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
