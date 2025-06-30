import React from "react";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";
function BuildingListCalculator() {
  const {
    saveArray,
    setSaveArray,
    totalResourceArray,
    setTotalResourceArray,
    handleBuildLvOnClick,
  } = useBuildingStore();
  function renderTotalResources(saveArray) {
    let resultArray = [];
    for (let i in saveArray) {
      let key = Object.keys(saveArray[i])[0];
      let value = Object.values(saveArray[i])[0];
      let targetList = resourcesList[0][key];
      let target = targetList.find((a) => a.lv === value);
      resultArray.push(target);
    }
    let totalWood = 0;
    let totalBrick = 0;
    let totalIron = 0;
    let totalCorp = 0;
    let totalTotal = 0;
    for (let j in resultArray) {
      totalWood += resultArray[j].wood;
      totalBrick += resultArray[j].brick;
      totalIron += resultArray[j].iron;
      totalCorp += resultArray[j].corp;
      totalTotal += resultArray[j].total;
    }
    return (
      <div className="flex">
        <div className="wid25 txt-center border1S7E7E7E">總和</div>
        <div className="wid12 txt-center border1S7E7E7E">{totalWood}</div>
        <div className="wid12 txt-center border1S7E7E7E">{totalBrick}</div>
        <div className="wid12 txt-center border1S7E7E7E">{totalIron}</div>
        <div className="wid12 txt-center border1S7E7E7E">{totalCorp}</div>
        <div className="wid15 txt-center border1S7E7E7E">{totalTotal}</div>
      </div>
    );
  }
  let groups = {};
  saveArray.forEach((item) => {
    let key = Object.keys(item)[0];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => a[key] - b[key]);
  });

  let sortedArray = [];
  Object.keys(groups).forEach((key) => {
    sortedArray = [...sortedArray, ...groups[key]];
  });
  return (
    <div className="wid35">
      <div className="color_0600ff l-hei1p7r hei1p7r mTop_02 mBot_05 flex">
        <span className="fs20px fw-bold">當前統計之建築清單</span>{" "}
        <span className="color_cf2321">點擊不要的建築項目即可從清單中移除</span>
      </div>
      <div className="">
        <div className="flex">
          <div className="wid25 txt-center border1S7E7E7E">建築物</div>
          <div className="wid12 txt-center border1S7E7E7E">木</div>
          <div className="wid12 txt-center border1S7E7E7E">泥</div>
          <div className="wid12 txt-center border1S7E7E7E">鐵</div>
          <div className="wid12 txt-center border1S7E7E7E">米</div>
          <div className="wid15 txt-center border1S7E7E7E">總和</div>
        </div>
        <div className="bias">
          {sortedArray.length > 0 &&
            sortedArray.map((item, index) => {
              let targetList = resourcesList[0][Object.keys(item)[0]];
              let target = targetList.find(
                (a) => a.lv === Object.values(item)[0]
              );
              return (
                <div
                  className="flex buildinginCalculator"
                  key={index}
                  onClick={() => handleBuildLvOnClick(item)}
                >
                  <div className="wid25 txt-center border1S7E7E7E">
                    {Object.keys(item)[0]} - 等級{Object.values(item)}
                  </div>
                  <div className="wid12 txt-center border1S7E7E7E">
                    {target.wood}
                  </div>
                  <div className="wid12 txt-center border1S7E7E7E">
                    {target.brick}
                  </div>
                  <div className="wid12 txt-center border1S7E7E7E">
                    {target.iron}
                  </div>
                  <div className="wid12 txt-center border1S7E7E7E">
                    {target.corp}
                  </div>
                  <div className="wid15 txt-center border1S7E7E7E">
                    {target.total}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <div className="flex mTop_05 ">
          <div className="wid25 txt-center border1S7E7E7E"></div>
          <div className="wid12 txt-center border1S7E7E7E">木</div>
          <div className="wid12 txt-center border1S7E7E7E">泥</div>
          <div className="wid12 txt-center border1S7E7E7E">鐵</div>
          <div className="wid12 txt-center border1S7E7E7E">米</div>
          <div className="wid15 txt-center border1S7E7E7E">總和</div>
        </div>
        <div className="">
          {renderTotalResources(
            saveArray,
            setSaveArray,
            totalResourceArray,
            setTotalResourceArray
          )}
        </div>
      </div>
    </div>
  );
}

export default BuildingListCalculator;
