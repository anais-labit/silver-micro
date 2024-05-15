import React from "react";
import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";
import RestaurantsList from "./pages/restaurant/RestaurantsList";
import Authentication from "./pages/Authentication";
import UserDetails from "./pages/User";
import OwnerPanel from "./pages/owner/OwnerPanel";
import RestaurantDetails from "./pages/restaurant/RestaurantDetails";
import CreateRestaurant from "./pages/root/CreateRestaurant";
import CreateUser from "./pages/root/CreateUser";
import RootPanel from "./pages/root/RootPanel";
import UpdateRestaurant from "./pages/owner/UpdateRestaurant";
// import OwnerPanel from "./pages/owner/OwnerPanel";
// import OwnerRestaurants from "./pages/owner/OwnerRestaurants";

function App() {
  const userRole = localStorage.getItem("role");

  const hasAccess = (role, allowedRoles) => {
    return allowedRoles.includes(role);
  };

  return (
    <Router>
      <Routes>
        {/* Routes pour tous les rôles */}
        <Route path="/" element={<Authentication />} />
        <Route path="/restaurants" element={<RestaurantsList />} />
        <Route path="/restaurants/:title" element={<RestaurantDetails />} />
        {/* <Route path="/restaurants/:title/books" element={<RestaurantBookList />} /> */}
        <Route path="/user" element={<UserDetails />} />
        <Route path="/user/bookings" element={<UserDetails />} />

        {/* Routes pour le rôle 'owner' */}
        {hasAccess(userRole, ["owner"]) && (
          <>
            <Route path="/owner/panel" element={<OwnerPanel />} />
            <Route path="/owner/panel/update-restaurant/:restaurantId" element={<UpdateRestaurant />}
            />
          </>
        )}

        {/* Routes pour le rôle 'root' */}
        {hasAccess(userRole, ["root"]) && (
          <>
            <Route path="/root/panel" element={<RootPanel />} />
            {/* <Route path="/root/panel/restaurants" element={<RootPanel />} />
            <Route path="/root/panel/users" element={<RootPanel />} /> */}
            <Route
              path="/root/panel/restaurants/create"
              element={<CreateRestaurant />}
            />
            <Route path="/root/panel/users/create" element={<CreateUser />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
