import React from "react";
import { Checkbox } from "antd";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";
import "../../style/common.less";
function BuildingListCostDetailMobile() {
  const {
    build,
    multiple,
    setMultiple,
    multipleStartItem,
    setMultipleStartItem,
    isMultipleCount,
    setIsMultipleCount,
    handleBuildLvOnClick,
  } = useBuildingStore();
  const resourceData = resourcesList[0][build] || [];
  const compareValue =
    Object.values(multipleStartItem).length > 0
      ? Object.values(multipleStartItem)[0]
      : "";
  const { displayHeight } = useBuildingStore();

  const renderRow = ({ lv, wood, brick, iron, corp, pop, CP, total }) => {
    const isActive = compareValue === lv;
    const rowClass = `txt-center border1S7E7E7E ${isActive ? "firstItem" : ""}`;

    return (
      <div
        className={`flex bulidingLevelList hei12r l-hei12r fs07r ${lv % 2 === 1 ? "bg_e3fdff" : "bg_f7f7f7"}`}
        key={lv}
        onClick={() => handleBuildLvOnClick({ [build]: lv }, false)}
      >
        <div className={`wid10 ${rowClass}`}>{lv}</div>
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
    <div className="wid100">
      <div className="flex">
        <div className="color_64727d l-hei1p7r hei1p7r wid30 mTop_02 mBot_05 fw-bold fs09r mBot_05 mLeft_1">
          {build}
        </div>
        {build && (
          <div className="wid70 mTop_02 mBot_05">
            <Checkbox
              checked={multiple}
              onChange={(e) => {
                const checked = e.target.checked;
                setMultiple(checked);
                if (!checked) setMultipleStartItem({});
              }}
            >
              <span
                className={`fs1r ${multiple ? "color_cf2321" : "color_8a8a8a"}`}
              >
                選取多個等級
              </span>
            </Checkbox>
            <Checkbox
              checked={isMultipleCount}
              onChange={(e) => {
                const checked = e.target.checked;
                setIsMultipleCount(checked);
                if (!checked) setMultipleStartItem({});
              }}
              style={{ marginLeft: 12 }}
            >
              <span
                className={`fs1r ${isMultipleCount ? "color_cf2321" : "color_8a8a8a"}`}
              >
                複數計算
              </span>
            </Checkbox>
          </div>
        )}
      </div>

      <div className="flowAuto" style={{ maxHeight: displayHeight + "rem" }}>
        <div className="flex fs07r">
          <div className="wid10 txt-center border1S7E7E7E">等級</div>
          <div className="wid15 txt-center border1S7E7E7E">木</div>
          <div className="wid15 txt-center border1S7E7E7E">泥</div>
          <div className="wid15 txt-center border1S7E7E7E">鐵</div>
          <div className="wid15 txt-center border1S7E7E7E">米</div>
          <div className="wid8 txt-center border1S7E7E7E">人口</div>
          <div className="wid8 txt-center border1S7E7E7E">CP</div>
          <div className="wid16 txt-center border1S7E7E7E">總和</div>
        </div>

        <div>{resourceData.map(renderRow)}</div>
      </div>
    </div>
  );
}

export default BuildingListCostDetailMobile;
