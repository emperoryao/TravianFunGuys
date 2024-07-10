import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuildingList from './pages/buildingList';
import CulturePoints from './pages/CulturePoints';
import FarmOasis from './pages/farmOasis';
import Lobby from './pages/Lobby';
import DistanceCalculate from './pages/DistanceCalculate';
import './style/common.less'
function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Lobby/>}/>
        <Route path="/farmOasis" element={<FarmOasis />} />
        <Route path="/buildingList" element={<BuildingList />} />
        <Route path="/CulturePoints" element={<CulturePoints />} />
        <Route path="/DistanceCalculate" element={<DistanceCalculate />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;