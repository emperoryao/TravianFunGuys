import React from "react";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";
import "../../style/common.less";

const usuallyCSS = "wid10 txt-center border1S7E7E7E";
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
    const value = item[key];
    const count = item.count || 1;
    const target = resourcesList[0][key].find((a) => a.lv === value);

    // 若資源資料找不到（例：資料被移除），避免錯誤
    if (!target) return null;

    // 計算乘上 count 的結果
    const displayResource = {
      wood: target.wood * count,
      brick: target.brick * count,
      iron: target.iron * count,
      corp: target.corp * count,
      CP: target.CP * count,
      total: target.total * count,
    };

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
        <div className={usuallyCSS}>{displayResource.wood}</div>
        <div className={usuallyCSS}>{displayResource.brick}</div>
        <div className={usuallyCSS}>{displayResource.iron}</div>
        <div className={usuallyCSS}>{displayResource.corp}</div>
        <div className={usuallyCSS}>{displayResource.CP}</div>
        <div className="wid15 txt-center border1S7E7E7E">
          {displayResource.total}
        </div>
      </div>
    );
  });
}

function BuildingListCalculator() {
  const { saveArray, handleBuildLvOnClick } = useBuildingStore();

  const sortedArray = getSortedSaveArray(saveArray);
  const totals = calculateTotalResources(saveArray);

  return (
    <div className="wid35">
      <div className="color_0600ff l-hei1p7r hei1p7r mTop_02 mBot_05">
        <span className="fs20px fw-bold">當前統計之建築清單</span>
        <span className="color_cf2321 mLeft_05">
          點擊不要的建築項目即可從清單中移除
        </span>
      </div>

      <div>
        <div className="flex">
          <div className="wid25 txt-center border1S7E7E7E">建築物</div>
          <div className={usuallyCSS}>木</div>
          <div className={usuallyCSS}>泥</div>
          <div className={usuallyCSS}>鐵</div>
          <div className={usuallyCSS}>米</div>
          <div className={usuallyCSS}>文明點</div>
          <div className="wid15 txt-center border1S7E7E7E">總和</div>
        </div>

        {/* 建築列 */}
        <div className="bias">
          {renderRows(sortedArray, (item, isDeleteMode = true) =>
            handleBuildLvOnClick(item, isDeleteMode)
          )}
        </div>
      </div>

      <div className="mTop_05">
        <div className="flex">
          <div className="wid25 txt-center border1S7E7E7E"></div>
          <div className={usuallyCSS}>木</div>
          <div className={usuallyCSS}>泥</div>
          <div className={usuallyCSS}>鐵</div>
          <div className={usuallyCSS}>米</div>
          <div className={usuallyCSS}>文明點</div>
          <div className="wid15 txt-center border1S7E7E7E">總和</div>
        </div>
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
