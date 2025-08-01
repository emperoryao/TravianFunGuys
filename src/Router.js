import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveRoute from "./components/ResponsiveRoute";
import BuildingList from "./pages/BuildingList";
import BuildingListMobile from "./pages/BuildingListMobile";
import FarmOasis from "./pages/FarmOasis";
import FarmOasisMobile from "./pages/FarmOasisMobile";
import Lobby from "./pages/Lobby";
import LobbyMobile from "./pages/LobbyMobile";
import DistanceCalculate from "./pages/DistanceCalculate";
import DistanceCalculateMobile from "./pages/DistanceCalculateMobile";
import AttackWaveAnalyzer from "./pages/AttackWaveAnalyzer";
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
        <Route
          path="/BuildingList"
          element={
            <ResponsiveRoute
              desktopComponent={BuildingList}
              mobileComponent={BuildingListMobile}
            />
          }
        />
        <Route
          path="/DistanceCalculate"
          element={
            <ResponsiveRoute
              desktopComponent={DistanceCalculate}
              mobileComponent={DistanceCalculateMobile}
            />
          }
        />
        <Route
          path="/AttackWaveAnalyzer"
          element={
            <ResponsiveRoute
              desktopComponent={AttackWaveAnalyzer}
              mobileComponent={AttackWaveAnalyzer}
            />
          }
        />
        {/* <Route path="/CulturePoints" element={<CulturePoints />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
