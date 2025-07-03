import React from "react";
import useBuildingStore from "../../store/buildingListStroe";
import buildingObj from "../../config/buildingNameList";
import "../../style/common.less";
function BuildingListItemMobile() {
  const { setMultiple, setMultipleStartItem, setBuild } = useBuildingStore();
  const handleBuidingOnClick = (item) => {
    setMultiple(false);
    setMultipleStartItem({});
    setBuild(item);
  };
  let categories = Object.keys(buildingObj);
  return (
    <div className="wid100 hei75vh flex flexWrap_wrap ">
      {categories.map((item, index) => {
        return (
          <div className="wid33" key={index}>
            <div className="txt-center borderBottom1Sblack wid80 mTop_03 mBot_05 pRight_05 pLeft_05 fw-bold hei1p7r">
              {item}
            </div>
            {buildingObj[item].map((buildings) => (
              <div
                className="build txt-center wid80 mTop_03 pRight_05 pLeft_05 border1S00003 borderRadius05r bg_030095 color_fff"
                key={buildings}
              >
                <div onClick={() => handleBuidingOnClick(buildings)}>
                  {buildings}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
export default BuildingListItemMobile;
