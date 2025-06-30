import React from "react";
import { Checkbox } from "antd";
import useBuildingStore from "../../store/buildingListStroe";
import resourcesList from "../../config/buildingListResourceList";

function BuildingListCostDetail() {
  const {
    build,
    saveArray,
    setSaveArray,
    multiple,
    setMultiple,
    multipleStartItem,
    setMultipleStartItem,
    handleBuildLvOnClick,
  } = useBuildingStore();
  function renderCurrentBuilding(
    build,
    saveArray,
    setSaveArray,
    mutiple,
    setMutiple,
    multipleStartItem,
    setMultipleStartItem
  ) {
    let data = resourcesList[0][build];
    let compareValue =
      Object.values(multipleStartItem).length > 0
        ? Object.values(multipleStartItem)[0]
        : "";
    return (
      <div className="">
        {data &&
          data.map((item, index) => {
            const { lv, wood, brick, iron, corp, total, pop, CP } = item;

            return (
              <div
                className={`flex bulidingLevelList `}
                key={index}
                onClick={() =>
                  handleBuildLvOnClick(
                    { [build]: lv },
                    saveArray,
                    setSaveArray,
                    mutiple,
                    setMutiple,
                    multipleStartItem,
                    setMultipleStartItem,
                    data
                  )
                }
              >
                <div
                  key={lv + "lv"}
                  className={`wid8 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""}`}
                >
                  {lv}
                </div>
                <div
                  key={lv + "wood"}
                  className={`wid15 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""}`}
                >
                  {wood}
                </div>
                <div
                  key={lv + "brick"}
                  className={`wid15 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
                >
                  {brick}
                </div>
                <div
                  key={lv + "iron"}
                  className={`wid15 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
                >
                  {iron}
                </div>
                <div
                  key={lv + "corp"}
                  className={`wid15 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""}  `}
                >
                  {corp}
                </div>
                <div
                  key={lv + "pop"}
                  className={`wid8 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
                >
                  {pop}
                </div>
                <div
                  key={lv + "CP"}
                  className={`wid8 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
                >
                  {CP}
                </div>
                <div
                  key={lv + "total"}
                  className={`wid16 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
                >
                  {total}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
  return (
    <div className="wid28 mLeft_05">
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
                className={`${multiple ? "color_cf2321" : "color_8a8a8a"} fs1r`}
              >
                選取多個等級
              </span>
            </Checkbox>
          </div>
        )}
      </div>
      <div className="maxhei60vh flowAuto">
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
        {renderCurrentBuilding(
          build,
          saveArray,
          setSaveArray,
          multiple,
          setMultiple,
          multipleStartItem,
          setMultipleStartItem
        )}
      </div>
    </div>
  );
}

export default BuildingListCostDetail;
