import React from "react";
import Navbar from "../components/Navbar";
import BuildingListItem from "../components/BuildingList/BuildingListItem";
import BuildingListCostDetail from "../components/BuildingList/BuildingListCostDetail";
import BuildingListCalculator from "../components/BuildingList/BuildingListCalculator";
import "../style/common.less";
function BuildingList() {
  return (
    <div className="mLeft_1">
      <Navbar />
      <div className="mLeft_1 color_brown fw-bold fs2p5r borderBottom1Sad320d ">
        建築資源計算器
      </div>
      <div className="flex mLeft_1 mTop_05">
        <BuildingListItem />
        <BuildingListCostDetail />
        <BuildingListCalculator />
      </div>
    </div>
  );
}

export default BuildingList;
