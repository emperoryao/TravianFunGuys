import React, { useState } from "react";
import useBuildingStore from "../store/buildingListStroe";
import NavbarMobile from "../components/NavbarMobile";
import BuildingListItemMobile from "../components/BuildingList/BuildingListItemMobile";
import BuildingListCostDetailMobile from "../components/BuildingList/BuildingListCostDetailMobile";
import BuildingListCalculatorMobile from "../components/BuildingList/BuildingListCalculatorMobile";
import "../style/common.less";
function BuildingListMobile() {
  const [showBuildingListItem, setShowBuildingListItem] = useState(false);
  const { build } = useBuildingStore();
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
      <div className="flex mTop_05 wid100">
        {<BuildingListCalculatorMobile />}
      </div>
      <div> {build && <BuildingListCostDetailMobile />}</div>
      {showBuildingListItem && (
        <div
          className="here pAbsolute top_0 hei100 bg_00007 pTop_8 wid100"
          onClick={() => setShowBuildingListItem(!showBuildingListItem)}
        >
          <BuildingListItemMobile />
        </div>
      )}
    </div>
  );
}

export default BuildingListMobile;
