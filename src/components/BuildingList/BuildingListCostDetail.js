import React from "react";
import { Checkbox } from "antd";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";
import "../../style/common.less";

function BuildingListCostDetail() {
  const {
    build,
    multiple,
    setMultiple,
    multipleStartItem,
    handleBuildLvOnClick,
  } = useBuildingStore();

  const resourceData = resourcesList[0][build] || [];
  const compareValue =
    Object.values(multipleStartItem).length > 0
      ? Object.values(multipleStartItem)[0]
      : "";

  const renderRow = ({ lv, wood, brick, iron, corp, pop, CP, total }) => {
    const isActive = compareValue === lv;
    const rowClass = `txt-center border1S7E7E7E ${isActive ? "firstItem" : ""}`;

    return (
      <div
        className="flex bulidingLevelList"
        key={lv}
        onClick={() => handleBuildLvOnClick({ [build]: lv })}
      >
        <div className={`wid8 ${rowClass}`}>{lv}</div>
        <div className={`wid15 ${rowClass}`}>{wood}</div>
        <div className={`wid15 ${rowClass}`}>{brick}</div>
        <div className={`wid15 ${rowClass}`}>{iron}</div>
        <div className={`wid15 ${rowClass}`}>{corp}</div>
        <div className={`wid8 ${rowClass}`}>{pop}</div>
        <div className={`wid8 ${rowClass}`}>{CP}</div>
        <div className={`wid16 ${rowClass}`}>{total}</div>
      </div>
    );
  };

  return (
    <div className="wid35 mRight_4p mLeft_4p">
      <div className="flex">
        <div className="color_0600ff l-hei1p7r hei1p7r wid30 mTop_02 mBot_05 fw-bold">
          {build}
        </div>
        {build && (
          <div className="l-hei1p7r hei1p7r wid30 mTop_02 mBot_05 fw-bold">
            <Checkbox
              checked={multiple}
              onChange={(e) => setMultiple(e.target.checked)}
            >
              <span
                className={`fs1r ${multiple ? "color_cf2321" : "color_8a8a8a"}`}
              >
                選取多個等級
              </span>
            </Checkbox>
          </div>
        )}
      </div>

      <div className="maxhei60vh flowAuto">
        {/* 表頭 */}
        <div className="flex">
          <div className="wid8 txt-center border1S7E7E7E">等級</div>
          <div className="wid15 txt-center border1S7E7E7E">木</div>
          <div className="wid15 txt-center border1S7E7E7E">泥</div>
          <div className="wid15 txt-center border1S7E7E7E">鐵</div>
          <div className="wid15 txt-center border1S7E7E7E">米</div>
          <div className="wid8 txt-center border1S7E7E7E">人口</div>
          <div className="wid8 txt-center border1S7E7E7E">CP</div>
          <div className="wid16 txt-center border1S7E7E7E">總和</div>
        </div>

        {/* 資料列 */}
        <div>{resourceData.map(renderRow)}</div>
      </div>
    </div>
  );
}

export default BuildingListCostDetail;
