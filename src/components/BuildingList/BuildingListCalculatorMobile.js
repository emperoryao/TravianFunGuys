import React from "react";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";
import "../../style/common.less";

const usuallyCSS = "wid16 txt-center border1S7E7E7E";
const usuallyCPCSS = "wid8 txt-center border1S7E7E7E";
// 計算資源總和
function calculateTotalResources(saveArray) {
  const resultArray = saveArray.map((entry) => {
    const [key, value] = [Object.keys(entry)[0], Object.values(entry)[0]];
    const list = resourcesList[0][key];
    return list.find((item) => item.lv === value);
  });

  return resultArray.reduce(
    (acc, cur) => {
      acc.wood += cur.wood;
      acc.brick += cur.brick;
      acc.iron += cur.iron;
      acc.corp += cur.corp;
      acc.CP += cur.CP;
      acc.total += cur.total;
      return acc;
    },
    { wood: 0, brick: 0, iron: 0, corp: 0, CP: 0, total: 0 }
  );
}

// 取得排序後的建築陣列
function getSortedSaveArray(saveArray) {
  const groups = {};
  for (const item of saveArray) {
    const key = Object.keys(item)[0];
    groups[key] ??= [];
    groups[key].push(item);
  }

  return Object.keys(groups)
    .sort()
    .flatMap((key) => groups[key].sort((a, b) => a[key] - b[key]));
}

// 渲染建築資源列
function renderRows(sortedArray, handleClick) {
  return sortedArray.map((item, index) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];
    const target = resourcesList[0][key].find((a) => a.lv === value);
    console.log("target", target);
    return (
      <div
        className="flex buildinginCalculator"
        key={`${key}-${value}-${index}`}
        onClick={() => handleClick(item)}
      >
        <div className="part4 wid20 txt-center border1S7E7E7E">{`${key}${value}`}</div>
        <div className={usuallyCSS}>{target.wood}</div>
        <div className={usuallyCSS}>{target.brick}</div>
        <div className={usuallyCSS}>{target.iron}</div>
        <div className={usuallyCSS}>{target.corp}</div>
        <div className={usuallyCPCSS}>{target.CP}</div>
        <div className="wid15 txt-center border1S7E7E7E">{target.total}</div>
      </div>
    );
  });
}

function BuildingListCalculatorMobile() {
  const { saveArray, handleBuildLvOnClick } = useBuildingStore();

  const sortedArray = getSortedSaveArray(saveArray);
  const totals = calculateTotalResources(saveArray);

  return (
    <div className="wid100">
      <div className="BuildingListMobileTile mLeft_1 l-hei1p7r hei1p7r mTop_02 mBot_05 flex fs1r fw-bold">
        當前統計之建築清單
      </div>
      <div className="color_0600ff fs09r mBot_05 mLeft_1">
        點擊不要的建築項目即可從清單中移除
      </div>

      <div>
        <div className="flex fs07r">
          <div className="part1 wid20 txt-center border1S7E7E7E">建築物</div>
          <div className={usuallyCSS}>木</div>
          <div className={usuallyCSS}>泥</div>
          <div className={usuallyCSS}>鐵</div>
          <div className={usuallyCSS}>米</div>
          <div className={usuallyCPCSS}>文明</div>
          <div className="wid15 txt-center border1S7E7E7E">總和</div>
        </div>

        {/* 建築列 */}
        <div className="bias fs07r">
          {renderRows(sortedArray, handleBuildLvOnClick)}
        </div>
      </div>

      <div className="mTop_05">
        <div className="flex fs07r">
          <div className="part2 wid20 txt-center border1S7E7E7E"></div>
          <div className={usuallyCSS}>木</div>
          <div className={usuallyCSS}>泥</div>
          <div className={usuallyCSS}>鐵</div>
          <div className={usuallyCSS}>米</div>
          <div className={usuallyCPCSS}>文明</div>
          <div className="wid15 txt-center border1S7E7E7E">總和</div>
        </div>
        <div className="flex fs07r">
          <div className="part3 wid20 txt-center border1S7E7E7E">總和</div>
          <div className={usuallyCSS}>{totals.wood}</div>
          <div className={usuallyCSS}>{totals.brick}</div>
          <div className={usuallyCSS}>{totals.iron}</div>
          <div className={usuallyCSS}>{totals.corp}</div>
          <div className={usuallyCPCSS}>{totals.CP}</div>
          <div className="wid15 txt-center border1S7E7E7E">{totals.total}</div>
        </div>
      </div>
    </div>
  );
}

export default BuildingListCalculatorMobile;
