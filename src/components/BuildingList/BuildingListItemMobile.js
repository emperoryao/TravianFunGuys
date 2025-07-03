import React, { useState } from "react";
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
  const [currentCategory, setCurrentCategory] = useState(0);
  let categories = Object.keys(buildingObj);
  console.log("categories", categories);

  return (
    <div className="wid100 hei75vh flexWrap_wrap">
      <div className="flex justify-SpaceEvenly mBot_1">
        {categories.map((item, index) => {
          return (
            <div
              className={`widFit fs09r hei2r l-hei2r pRight_02 pLeft_02 borderRadius02r ${currentCategory === index ? "bg_BuildingCateGorySelectd color_fff border1S2d2d31" : "border1S2d2d31 bg_FarmOasisUnSelectd"}`}
              key={index}
              onClick={(e) => {
                setCurrentCategory(index);
                e.stopPropagation();
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="fs1r hei2r l-hei2r pLeft_40p">
        {buildingObj[categories[currentCategory]].map((buildings) => (
          <div
            className="build txt-center wid45 mTop_05 borderRadius05r bg_BuildingCateGorySelectd2"
            key={buildings}
          >
            <div onClick={() => handleBuidingOnClick(buildings)}>
              {buildings}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BuildingListItemMobile;
