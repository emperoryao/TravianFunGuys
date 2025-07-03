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
    <div className="pBot_4p5">
      <NavbarMobile />
      <div className="mLeft_1 fs1p5r borderBottom1Sad320d flex  ">
        <div className=" color_brown fw-bold ">建築資源計算器</div>
        <div
          className="bg_002eff color_fff border1S7E7E7E fs1r pTop_02 pRight_05 pBot_02 pLeft_05 mTop_02 mBot_02 mLeft_3 borderRadius03r"
          onClick={() => setShowBuildingListItem(!showBuildingListItem)}
        >
          建築列表
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
