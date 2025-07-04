import React, { useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { raceChinese, raceInfo } from "../config/farmOasisRaceInfo";
import animals from "../config/farmOasisAnimalData";
import BasicDescriptionMobile from "../components/FarmOasis/BasicDescriptionMobile";
import AnimalRespawnLogicMobile from "../components/FarmOasis/AnimalRespawnLogicMobile";
import AnimalRespawnExampleMobile from "../components/FarmOasis/AnimalRespawnExampleMobile";
import TroopsConfigurationMobile from "../components/FarmOasis/TroopsConfigurationMobile";
function FarmOasisMobile() {
  const [pickRace, setPickRace] = useState(1);
  const [showRuleNumber, setShowRuleNumber] = useState(5);
  const ruleOptions = [
    { title: "基本說明", value: 1 },
    { title: "生怪週期", value: 2 },
    { title: "生怪邏輯", value: 3 },
    { title: "生怪示例", value: 4 },
    { title: "刷綠配置", value: 5 },
  ];
  function renderAnimalRespawnTable() {
    return (
      <div className="mLeft_1">
        <div className="flex align-center ">
          <div className="wid32px txt-center outline1S00003">圖示</div>
          <div className="wid100px txt-center outline1S00003">動物名稱</div>
          <div className="wid200px txt-center outline1S00003">
            重生時間(分鐘)
          </div>
        </div>
        {animals.map((animal, index) => (
          <div className="flex l-hei32px hei32px" key={index}>
            <div className="hei32px wid32px txt-center outline1S00003">
              <img
                alt=""
                className={`hei32px wid32px animal ${animal.iconClass}`}
              />
            </div>
            <div className="wid100px txt-center outline1S00003">
              {animal.name}
            </div>
            <div className="wid200px txt-center outline1S00003">
              {animal.respawnMinutes}
            </div>
          </div>
        ))}
      </div>
    );
  }
  function renderTroppsCompositionMobile() {
    return (
      <div className="mLeft_1 borderTop1Sad320d pTop_1 pBot_65">
        {
          <div className="">
            <div className="flex txt-center mBot_05">
              {raceChinese.map((item, index) => {
                return (
                  <div
                    className={`wid10 mRight_5p pRight_04 pLeft_04 fs1r hei2r l-hei2r borderRadius02r ${pickRace === index + 1 ? "bg_00007 color_fff" : "border1S00003 bg_fff"}`}
                    key={index}
                    onClick={() => setPickRace(index + 1)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>

            {pickRace ? (
              <div>
                <div className="fs1p2r fw-bold FarmOasisMobileTitle mBot_05">
                  {raceChinese[pickRace - 1]}人刷綠配置
                </div>
                <div className="flex flexWrap_wrap">
                  <TroopsConfigurationMobile
                    title="最佳配置"
                    config={
                      raceInfo[raceChinese[pickRace - 1]].bestConfiguration
                    }
                  />
                  {(
                    raceInfo[raceChinese[pickRace - 1]].otherConfiguration || []
                  ).map((conf, i) => (
                    <TroopsConfigurationMobile
                      key={i}
                      title={`其他配置${i + 1}`}
                      config={conf}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        }
      </div>
    );
  }

  function handle4logicButtonOnClick(number) {
    setPickRace(1);
    if (number !== showRuleNumber) {
      setShowRuleNumber(number);
    }
  }
  return (
    <div className="">
      <NavbarMobile />
      <div className="mLeft_1 color_brown fw-bold fs1p5r borderBottom1Sad320d">
        關於刷綠
      </div>
      <div className="mTop_05 mRight_1 mBot_05 mLeft_1 flex justify-SpaceBetween hei3r l-hei3r align-center">
        {ruleOptions.map((item) => {
          return (
            <div
              className={`widFit fs09r hei2r l-hei2r pRight_02 pLeft_02 borderRadius02r ${showRuleNumber === item.value ? "bg_FarmOasisSelectd color_fff border1S2d2d31" : "border1S2d2d31 bg_FarmOasisUnSelectd"}`}
              key={item.value}
              onClick={() => handle4logicButtonOnClick(item.value)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      {showRuleNumber === 1 && BasicDescriptionMobile()}
      {showRuleNumber === 2 && renderAnimalRespawnTable()}
      {showRuleNumber === 3 && AnimalRespawnLogicMobile()}
      {showRuleNumber === 4 && AnimalRespawnExampleMobile()}
      {showRuleNumber === 5 && renderTroppsCompositionMobile(pickRace)}
    </div>
  );
}

export default FarmOasisMobile;
