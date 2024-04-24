import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurant from './pages/Restaurant';
import Authentication from './pages/Authentication';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route path="/restaurants" element={<Restaurant />} />
    </Routes>
    </Router>
  )
}

export default App;
