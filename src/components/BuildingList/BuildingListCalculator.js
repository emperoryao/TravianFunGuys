import React from "react";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";
import "../../style/common.less";

const usuallyCSS = "wid10 txt-center border1S7E7E7E";
const RESOURCE_KEYS = ["wood", "brick", "iron", "corp", "CP", "total"];

// 取得單一項目的資源（已乘上 count），找不到資料回傳 null
function getItemResource(item) {
  const key = Object.keys(item)[0];
  const value = item[key];
  const count = item.count || 1;
  const target = resourcesList[0][key]?.find((a) => a.lv === value);
  if (!target) return null;

  return RESOURCE_KEYS.reduce((acc, k) => {
    acc[k] = target[k] * count;
    return acc;
  }, {});
}

// 計算資源總和（含 count）
function calculateTotalResources(saveArray) {
  const init = Object.fromEntries(RESOURCE_KEYS.map((k) => [k, 0]));
  return saveArray.reduce((acc, item) => {
    const res = getItemResource(item);
    if (!res) return acc;
    RESOURCE_KEYS.forEach((k) => (acc[k] += res[k]));
    return acc;
  }, init);
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
    const value = item[key];
    const count = item.count || 1;
    const res = getItemResource(item);
    if (!res) return null;

    return (
      <div
        className="flex buildinginCalculator"
        key={`${key}-${value}-${index}`}
        onClick={() => handleClick(item)}
      >
        <div className="wid25 txt-center border1S7E7E7E">
          <span>{`${key} - 等級${value}`}</span>
          {count > 1 && <span className="mLeft_03 color_cf2321">×{count}</span>}
        </div>
        <div className={usuallyCSS}>{res.wood}</div>
        <div className={usuallyCSS}>{res.brick}</div>
        <div className={usuallyCSS}>{res.iron}</div>
        <div className={usuallyCSS}>{res.corp}</div>
        <div className={usuallyCSS}>{res.CP}</div>
        <div className="wid15 txt-center border1S7E7E7E">{res.total}</div>
      </div>
    );
  });
}

// 表頭（上下兩處共用）
function HeaderRow({ firstLabel }) {
  return (
    <div className="flex">
      <div className="wid25 txt-center border1S7E7E7E">{firstLabel}</div>
      <div className={usuallyCSS}>木</div>
      <div className={usuallyCSS}>泥</div>
      <div className={usuallyCSS}>鐵</div>
      <div className={usuallyCSS}>米</div>
      <div className={usuallyCSS}>文明點</div>
      <div className="wid15 txt-center border1S7E7E7E">總和</div>
    </div>
  );
}

function BuildingListCalculator() {
  // 分開 selector，避免高度等其他 state 變動時觸發 re-render
  const saveArray = useBuildingStore((s) => s.saveArray);
  const handleBuildLvOnClick = useBuildingStore((s) => s.handleBuildLvOnClick);
  const clearSaveArray = useBuildingStore((s) => s.clearSaveArray);

  const sortedArray = getSortedSaveArray(saveArray);
  const totals = calculateTotalResources(saveArray);
  const isEmpty = saveArray.length === 0;

  const handleClearAll = () => {
    if (isEmpty) return;
    clearSaveArray();
  };

  return (
    <div className="wid35">
      <div className="color_0600ff l-hei1p7r hei1p7r mTop_02 mBot_05">
        <span className="fs20px fw-bold">當前統計之建築清單</span>
        <span className="color_cf2321 mRight_05 mLeft_05">
          點擊不要的建築項目即可從清單中移除
        </span>
        <span
          onClick={handleClearAll}
          className="pAll_02 border1S0600ff color_0b76ff borderRadius02r"
          style={{
            cursor: isEmpty ? "not-allowed" : "pointer",
          }}
        >
          清除全部
        </span>
      </div>

      <div>
        <HeaderRow firstLabel="建築物" />
        <div className="bias">
          {renderRows(sortedArray, (item) => handleBuildLvOnClick(item, true))}
        </div>
      </div>

      <div className="mTop_05">
        <HeaderRow firstLabel="" />
        <div className="flex">
          <div className="wid25 txt-center border1S7E7E7E">總和</div>
          <div className={usuallyCSS}>{totals.wood}</div>
          <div className={usuallyCSS}>{totals.brick}</div>
          <div className={usuallyCSS}>{totals.iron}</div>
          <div className={usuallyCSS}>{totals.corp}</div>
          <div className={usuallyCSS}>{totals.CP}</div>
          <div className="wid15 txt-center border1S7E7E7E">{totals.total}</div>
        </div>
      </div>
    </div>
  );
}

export default BuildingListCalculator;
