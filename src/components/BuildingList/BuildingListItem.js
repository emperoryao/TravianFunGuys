import React from "react";
import useBuildingStore from "../../store/buildingListStroe";
import buildingObj from "../../config/buildingNameList";
import "../../style/common.less";
function BuildingListItem() {
  const { setMultiple, setMultipleStartItem, setBuild } = useBuildingStore();
  const handleBuidingOnClick = (item) => {
    setMultiple(false);
    setMultipleStartItem({});
    setBuild(item);
  };
  return (
    <div className="wid25 hei75vh flex flexWrap_wrap ">
      <div className="wid33">
        <div className="txt-center borderBottom1Sblack wid80 mTop_03 mBot_05 pRight_05 pLeft_05 fw-bold hei1p7r">
          資源相關
        </div>
        {buildingObj["resourceField"].map((item1, index1) => {
          return (
            <div
              className="build txt-center wid80 mTop_03 pRight_05 pLeft_05 border1S00003 borderRadius05r"
              key={index1}
            >
              <div onClick={() => handleBuidingOnClick(item1)}>{item1}</div>
            </div>
          );
        })}
      </div>
      <div className="wid33">
        <div className="txt-center borderBottom1Sblack wid80 mTop_03 mBot_05 pRight_05 pLeft_05 fw-bold hei1p7r">
          軍事相關
        </div>
        {buildingObj["militaryBuildings"].map((item2, index2) => {
          return (
            <div
              className="build txt-center wid80 mTop_03 pRight_05 pLeft_05 border1S00003 borderRadius05r"
              key={index2}
            >
              <div onClick={() => handleBuidingOnClick(item2)}>{item2}</div>
            </div>
          );
        })}
      </div>
      <div className="wid33">
        <div className="txt-center borderBottom1Sblack wid80 mTop_03 mBot_05 pRight_05 pLeft_05 fw-bold hei1p7r">
          常見建築
        </div>
        {buildingObj["CommonBuildings"].map((item3, index3) => {
          return (
            <div
              className="build txt-center wid80 mTop_03 pRight_05 pLeft_05 border1S00003 borderRadius05r"
              key={index3}
            >
              <div onClick={() => handleBuidingOnClick(item3)}>{item3}</div>
            </div>
          );
        })}
      </div>
      <div className="wid33">
        <div className="txt-center borderBottom1Sblack wid80 mTop_03 mBot_05 pRight_05 pLeft_05 fw-bold hei1p7r">
          種族特色
        </div>
        {buildingObj["tribeBuildings"].map((item4, index4) => {
          return (
            <div
              className="build txt-center wid80 mTop_03 pRight_05 pLeft_05 border1S00003 borderRadius05r"
              key={index4}
            >
              <div onClick={() => handleBuidingOnClick(item4)}>{item4}</div>
            </div>
          );
        })}
      </div>
      <div className="wid33">
        <div className="txt-center borderBottom1Sblack wid80 mTop_03 pRight_05 pLeft_05 mBot_05 fw-bold hei1p7r">
          其他建築
        </div>
        {buildingObj["othersBuildings"].map((item5, index5) => {
          return (
            <div
              className="build txt-center wid80 mTop_03 pRight_05 pLeft_05 border1S00003 borderRadius05r"
              key={index5}
            >
              <div onClick={() => handleBuidingOnClick(item5)}>{item5}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BuildingListItem;
