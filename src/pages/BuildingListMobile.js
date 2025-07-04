import React, { useState, useEffect } from "react";
import useBuildingStore from "../store/buildingListStroe";
import NavbarMobile from "../components/NavbarMobile";
import BuildingListItemMobile from "../components/BuildingList/BuildingListItemMobile";
import BuildingListCostDetailMobile from "../components/BuildingList/BuildingListCostDetailMobile";
import BuildingListCalculatorMobile from "../components/BuildingList/BuildingListCalculatorMobile";

import "../style/common.less";
function BuildingListMobile() {
  const [showBuildingListItem, setShowBuildingListItem] = useState(false);
  const [showControlSettingBoard, setShowControlSettingBoard] = useState(false);

  const { build } = useBuildingStore();
  const {
    displayHeight,
    setDisplayHeight,
    calculatorHeight,
    setCalculatorHeight,
  } = useBuildingStore();

  const [tempDisplayHeight, setTempDisplayHeight] = useState(displayHeight);
  const [tempCalculatorHeight, setTempCalculatorHeight] =
    useState(calculatorHeight);

  function adjustHeight(value, setter) {
    return Math.max(5, Math.min(35, value));
  }
  function saveSettings() {
    setDisplayHeight(tempDisplayHeight);
    setCalculatorHeight(tempCalculatorHeight);
    localStorage.setItem("displayHeight", tempDisplayHeight);
    localStorage.setItem("calculatorHeight", tempCalculatorHeight);
    setShowControlSettingBoard(false); // 可選：儲存後自動關閉視窗
  }

  function hanldeInCrease(e, target) {
    e.preventDefault();
    if (target === "display") {
      const newValue = adjustHeight(tempDisplayHeight + 1);
      setTempDisplayHeight(newValue);
    } else {
      const newValue = adjustHeight(tempCalculatorHeight + 1);
      setTempCalculatorHeight(newValue);
    }
  }
  function hanldeDeCrease(e, target) {
    e.preventDefault();
    if (target === "display") {
      const newValue = adjustHeight(tempDisplayHeight - 1);
      setTempDisplayHeight(newValue);
    } else {
      const newValue = adjustHeight(tempCalculatorHeight - 1);
      setTempCalculatorHeight(newValue);
    }
  }
  useEffect(() => {
    if (showControlSettingBoard) {
      setTempDisplayHeight(displayHeight);
      setTempCalculatorHeight(calculatorHeight);
    }
  }, [showControlSettingBoard, calculatorHeight, displayHeight]);

  return (
    <div className="pBot_4p5">
      <NavbarMobile />
      <div className="mLeft_1 fs1p5r borderBottom1Sad320d flex  ">
        <div className=" color_brown fw-bold ">建築資源計算器</div>
        <div
          className="bg_002eff color_fff border1S7E7E7E fs1r pTop_02 pRight_05 pBot_02 pLeft_05 mTop_02 mBot_02 mLeft_2 borderRadius03r"
          onClick={() => setShowBuildingListItem(!showBuildingListItem)}
        >
          建築列表
        </div>
        <div
          className="bg_00001 fs08r border1S7E7E7E pTop_03 pRight_03 pBot_02 pLeft_03 mTop_02 mBot_02 mLeft_05 borderRadius03r"
          onClick={() => setShowControlSettingBoard(true)}
        >
          版面設置
        </div>
      </div>
      <div className="flex mTop_05 wid100">
        {<BuildingListCalculatorMobile />}
      </div>
      <div> {build && <BuildingListCostDetailMobile />}</div>
      {showBuildingListItem && (
        <div
          className="here pAbsolute top_0 hei100 bg_00007 pTop_8 wid100"
          onClick={() => setShowBuildingListItem(!showBuildingListItem)}
        >
          <BuildingListItemMobile />
        </div>
      )}
      {showControlSettingBoard && (
        <div
          className="pAbsolute top_0 wid100 hei100 bg_00007 pTop_8 pLeft_15p"
          onClick={() => setShowControlSettingBoard(false)}
        >
          <div
            className="wid70 bg_navbarButton hei12p5r pTop_1 borderRadius05r color_fff"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex mTop_1 align-center txt-center fs1r">
              <div className="pLeft_10p wid40">統計區高度：</div>
              <div
                className="wid5 border1S00003 pTop_02 pRight_05 pBot_02 pLeft_05 bg_fff rgba_95"
                onClick={(e) => hanldeDeCrease(e, "calculator")}
              >
                -
              </div>
              <span className="wid10 mRight_4p mLeft_4p">
                {tempCalculatorHeight}
              </span>
              <div
                className="wid5 border1S00003 pTop_02 pRight_05 pBot_02 pLeft_05 bg_fff rgba_95"
                onClick={(e) => hanldeInCrease(e, "calculator")}
              >
                +
              </div>
            </div>
            <div className="flex mTop_1 align-center txt-center fs1r">
              <div className="pLeft_15p wid40">顯示區高度：</div>
              <div
                className="wid5 border1S00003 pTop_02 pRight_05 pBot_02 pLeft_05 bg_fff rgba_95"
                onClick={(e) => hanldeDeCrease(e, "display")}
              >
                -
              </div>
              <span className="wid10 mRight_4p mLeft_4p">
                {tempDisplayHeight}
              </span>
              <div
                className="wid5 border1S00003 pTop_02 pRight_05 pBot_02 pLeft_05 bg_fff rgba_95"
                onClick={(e) => hanldeInCrease(e, "display")}
              >
                +
              </div>
            </div>

            <div className="txt-center mTop_15 fs1r">高度區間為 5 至 35</div>

            <div
              className="fs1r pAll_03 txt-center mTop_1 border1S00003 wid30 mLeft_33p borderRadius05r hei15r l-hei15r bg_fff rgba_95"
              onClick={saveSettings}
            >
              儲存設定
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuildingListMobile;
