import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BuildingList from './pages/buildingList';
import Page2 from './pages/Page2';
import FarmOasis from './pages/farmOasis';
import Lobby from './pages/Lobby';
import './style/common.less'
function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Lobby/>}/>
        <Route path="/farmOasis" element={<FarmOasis />} />
        <Route path="/buildingList" element={<BuildingList />} />
        <Route path="/Page2" element={<Page2 />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;