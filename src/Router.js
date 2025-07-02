import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveRoute from "./components/ResponsiveRoute";
import BuildingList from "./pages/BuildingList";
import CulturePoints from "./pages/CulturePoints";
import FarmOasis from "./pages/FarmOasis";
import FarmOasisMobile from "./pages/FarmOasisMobile";
import Lobby from "./pages/Lobby";
import LobbyMobile from "./pages/LobbyMobile";
import DistanceCalculate from "./pages/DistanceCalculate";
import "./style/common.less";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ResponsiveRoute
              desktopComponent={Lobby}
              mobileComponent={LobbyMobile}
            />
          }
        />
        <Route
          path="/FarmOasis"
          element={
            <ResponsiveRoute
              desktopComponent={FarmOasis}
              mobileComponent={FarmOasisMobile}
            />
          }
        />
        <Route path="/BuildingList" element={<BuildingList />} />
        <Route path="/CulturePoints" element={<CulturePoints />} />
        <Route path="/DistanceCalculate" element={<DistanceCalculate />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
