import React, { useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import BuildingListItemMobile from "../components/BuildingList/BuildingListItemMobile";
//import BuildingListCostDetailMobile from "../components/BuildingList/BuildingListCostDetailMobile";
import BuildingListCalculatorMobile from "../components/BuildingList/BuildingListCalculatorMobile";
import "../style/common.less";
function BuildingListMobile() {
  const [showBuildingListItem, setShowBuildingListItem] = useState(false);
  return (
    <div className="">
      <NavbarMobile />
      <div className="mLeft_1 color_brown fw-bold fs1p5r borderBottom1Sad320d flex  ">
        <div>建築資源計算器</div>
        <div
          className="border1S7E7E7E mLeft_10p"
          onClick={() => setShowBuildingListItem(!showBuildingListItem)}
        >
          建築
        </div>
      </div>
      <div className="flex mLeft_1 mTop_05 wid90 none">
        {<BuildingListCalculatorMobile />}

        {/*<BuildingListCostDetailMobile />*/}
      </div>
      <div
        className="here pAbsolute top_0 hei100 bg_00003 pTop_8"
        onClick={() => setShowBuildingListItem(!showBuildingListItem)}
      >
        {showBuildingListItem && <BuildingListItemMobile />}
      </div>
    </div>
  );
}

export default BuildingListMobile;
