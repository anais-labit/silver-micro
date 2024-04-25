import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantsList from './pages/restaurant/RestaurantsList';
import Authentication from './pages/Authentication';
import RestaurantDetails from './pages/restaurant/RestaurantDetails';
import CreateRestaurant from './pages/root/CreateRestaurant';
import RootPanel from './pages/root/RootPanel';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/restaurants" element={< RestaurantsList />} />
      <Route path="/restaurants/:title" element={<RestaurantDetails />} />
      <Route path="/root/panel" element={< RootPanel />} />
      {/* <Route path="/root/panel/restaurants" element={< RootPanel />} />
      <Route path="/root/panel/users" element={< RootPanel/>} /> */}
      {/* <Route path="/root/panel/bookings" element={< RootPanel/>} /> */}
      {/* <Route path="/root/panel/restaurants/create" element={< CreateRestaurant/>} /> */}
      {/* <Route path="/owner/panel" element={< OwnerPanel />} /> */}
      {/* <Route path="/owner/panel/restaurants" element={< OwnerRestaurants />} /> */}
      {/* <Route path="/owner/panel/bookings" element={< OwnerBookings />} />  */}
    </Routes>
    </Router>
  )
}

export default App;
