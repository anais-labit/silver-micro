import { useState, useEffect } from "react";
import AddButton from "../../components/AddButton";


const PATH = import.meta.env.VITE_PATH;

export default function RootPanel() {
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(true);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      fetch(PATH + "/root/panel/restaurants", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching restaurants");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetch result:", data.data);
          const restaurantsData = data.data;
          setRestaurants(restaurantsData);
        })
        .catch((error) => console.error("Error fetching restaurants:", error));
    }
  }, []);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      fetch(PATH + "/root/panel/users", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching users");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetch result:", data.data);
          const usersData = data.data;
          setUsers(usersData);
        })
        .catch((error) => console.error("Error fetching restaurants:", error));
    }
  }, []);

  const handleToggleView = () => {
    setShowRestaurants(!showRestaurants);
  };

  const handleAdd = () => {
    if (showRestaurants) {
      window.location.href = "/root/panel/restaurants/create";
    } else {
      window.location.href = "/root/panel/users/create";
    }
  };

  return (
    <>
      <section>
        <div className="flex justify-center items-center m-10">
          <h2 className="text-3xl">Les Rest'O</h2>
        </div>
        <div className="flex justify-between items-center m-5">
          <button onClick={handleToggleView}>
            {showRestaurants
              ? "Voir la liste des utilisateurs"
              : "Voir la liste des restaurants"}
          </button>
          <AddButton
            type={showRestaurants ? "restaurant" : "user"}
            onClick={handleAdd}
          />
        </div>
        {showRestaurants ? (
          <div className="overflow-x-auto m-5">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Owner</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.id}>
                    <td className="border px-4 py-2">{restaurant.name}</td>
                    <td className="border px-4 py-2">{restaurant.id_owner}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handleEdit(restaurant.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(restaurant.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto m-5">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Id</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">
                      {/* Ici, vous pouvez ajouter des boutons pour les actions */}
                      <button onClick={() => handleEdit(user.id)}>Edit</button>
                      <button onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
