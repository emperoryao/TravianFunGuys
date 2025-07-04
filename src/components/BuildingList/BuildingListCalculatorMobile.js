import React from "react";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";
import "../../style/common.less";
const usuallyCSS = "wid13 txt-center border1S7E7E7E";
const usuallyCPCSS = "wid8 txt-center border1S7E7E7E";

// ✅ 計算資源總和（支援 count）
function calculateTotalResources(saveArray) {
  const resultArray = saveArray.map((entry) => {
    const [key, value] = [Object.keys(entry)[0], Object.values(entry)[0]];
    const count = entry.count || 1;
    const list = resourcesList[0][key];
    const data = list.find((item) => item.lv === value);

    return {
      wood: data.wood * count,
      brick: data.brick * count,
      iron: data.iron * count,
      corp: data.corp * count,
      CP: data.CP * count,
      total: data.total * count,
    };
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

// ✅ 排序清單
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

// ✅ 渲染建築列（支援 ×N 顯示）
function renderRows(sortedArray, handleClick) {
  return sortedArray.map((item, index) => {
    const key = Object.keys(item)[0];
    const value = item[key];
    const count = item.count || 1;
    const target = resourcesList[0][key].find((a) => a.lv === value);
    if (!target) return null;

    const multiplied = {
      wood: target.wood * count,
      brick: target.brick * count,
      iron: target.iron * count,
      corp: target.corp * count,
      CP: target.CP * count,
      total: target.total * count,
    };

    return (
      <div
        className={`flex hei12r l-hei12r ${value % 2 === 1 ? "bg_e3fdff" : "bg_f7f7f7"}`}
        key={`${key}-${value}-${index}`}
        onClick={() => handleClick(item)}
      >
        <div className="part4 wid21 txt-center border1S7E7E7E">
          {`${key} LV${value}`}
          {count > 1 && <span className="color_cf2321"> ×{count}</span>}
        </div>
        <div className={usuallyCSS}>{multiplied.wood}</div>
        <div className={usuallyCSS}>{multiplied.brick}</div>
        <div className={usuallyCSS}>{multiplied.iron}</div>
        <div className={usuallyCSS}>{multiplied.corp}</div>
        <div className={usuallyCPCSS}>{multiplied.CP}</div>
        <div className="wid14 txt-center border1S7E7E7E">
          {multiplied.total}
        </div>
      </div>
    );
  });
}

function BuildingListCalculatorMobile() {
  const { saveArray, handleBuildLvOnClick } = useBuildingStore();

  const sortedArray = getSortedSaveArray(saveArray);
  const totals = calculateTotalResources(saveArray);
  const { calculatorHeight } = useBuildingStore();

  return (
    <div className="wid100">
      <div className="">
        <span className="BuildingListMobileTile mLeft_1 l-hei1p7r hei1p7r mTop_02 fs1r fw-bold">
          當前統計之建築清單
        </span>
        <span className="color_0600ff fs09r mBot_05 mLeft_05">
          點擊統計項目即從清單中移除
        </span>
      </div>

      <div>
        <div className="flex fs07r hei12r l-hei12r">
          <div className="part1 wid21 txt-center border1S7E7E7E">建築物</div>
          <div className={usuallyCSS}>木</div>
          <div className={usuallyCSS}>泥</div>
          <div className={usuallyCSS}>鐵</div>
          <div className={usuallyCSS}>米</div>
          <div className={usuallyCPCSS}>文明</div>
          <div className="wid14 txt-center border1S7E7E7E">總和</div>
        </div>

        <div
          className="bias fs07r flowAuto"
          style={{ maxHeight: calculatorHeight + "rem" }}
        >
          {renderRows(sortedArray, (item, isDeleteMode = true) =>
            handleBuildLvOnClick(item, isDeleteMode)
          )}
        </div>
      </div>

      <div className="mTop_05">
        <div className="flex fs07r hei12r l-hei12r">
          <div className="part2 wid21 txt-center border1S7E7E7E"></div>
          <div className={usuallyCSS}>木</div>
          <div className={usuallyCSS}>泥</div>
          <div className={usuallyCSS}>鐵</div>
          <div className={usuallyCSS}>米</div>
          <div className={usuallyCPCSS}>文明</div>
          <div className="wid14 txt-center border1S7E7E7E">總和</div>
        </div>
        <div className="flex fs07r hei12r l-hei12r">
          <div className="part3 wid21 txt-center border1S7E7E7E">總和</div>
          <div className={usuallyCSS}>{totals.wood}</div>
          <div className={usuallyCSS}>{totals.brick}</div>
          <div className={usuallyCSS}>{totals.iron}</div>
          <div className={usuallyCSS}>{totals.corp}</div>
          <div className={usuallyCPCSS}>{totals.CP}</div>
          <div className="wid14 txt-center border1S7E7E7E">{totals.total}</div>
        </div>
      </div>
    </div>
  );
}

export default BuildingListCalculatorMobile;
