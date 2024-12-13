import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import WindMap from "./WindMap";
import SolarMap from "./SolarMap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/wind" element={<WindMap />} />
        <Route path="/dashboard/solar" element={<SolarMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
