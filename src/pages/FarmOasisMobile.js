import React, { useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import { Radio } from "antd";
import { raceChinese, raceInfo } from "../config/farmOasisRaceInfo";
import animals from "../config/farmOasisAnimalData";
import BasicDescriptionMobile from "../components/FarmOasis/BasicDescriptionMobile";
import AnimalRespawnLogicMobile from "../components/FarmOasis/AnimalRespawnLogicMobile";
import AnimalRespawnExample from "../components/FarmOasis/AnimalRespawnExample";
import TroopsConfiguration from "../components/FarmOasis/TroopsConfiguration";
function FarmOasisMobile() {
  const [pickRace, setPickRace] = useState(1);
  const [showRuleNumber, setShowRuleNumber] = useState(1);
  const RadioGroup = Radio.Group;
  const ruleOptions = [
    { title: "基本說明", value: 1 },
    { title: "生怪週期", value: 2 },
    { title: "生怪邏輯", value: 3 },
    { title: "生怪示例", value: 4 },
    { title: "刷綠配置", value: 5 },
  ];
  function onRadioChange(e) {
    setPickRace(e.target.value);
  }
  function renderAnimalRespawnTable() {
    return (
      <div className="mLeft_1">
        <div className="flex">
          <div className="wid50px txt-center outline1S00003"></div>
          <div className="wid100px txt-center outline1S00003">動物名稱</div>
          <div className="wid200px txt-center outline1S00003">
            重生時間(分鐘)
          </div>
        </div>
        {animals.map((animal, index) => (
          <div className="flex" key={index}>
            <div className="wid50px txt-center outline1S00003">
              <img
                alt=""
                className={`hei16px wid16px animal ${animal.iconClass}`}
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
  function renderTroppsComposition() {
    return (
      <div className="mLeft_1">
        {
          <div>
            <RadioGroup
              onChange={onRadioChange}
              value={pickRace} // ✅ 這裡加上 value 綁定選中的值
              className="mBot_1"
            >
              <Radio key="1" value={1}>
                條頓
              </Radio>
              <Radio key="2" value={2}>
                羅馬
              </Radio>
              <Radio key="3" value={3}>
                高盧
              </Radio>
              <Radio key="4" value={4}>
                匈奴
              </Radio>
              <Radio key="5" value={5}>
                埃及
              </Radio>
            </RadioGroup>
            {pickRace ? (
              <div>
                <div>{raceChinese[pickRace - 1]}人刷綠配置</div>
                <div className="flex flex-wrap">
                  <TroopsConfiguration
                    title="最佳配置"
                    config={
                      raceInfo[raceChinese[pickRace - 1]].bestConfiguration
                    }
                  />
                  {(
                    raceInfo[raceChinese[pickRace - 1]].otherConfiguration || []
                  ).map((conf, i) => (
                    <TroopsConfiguration
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
              className={`widFit fs08r hei2r l-hei2r pRight_04 pLeft_04 borderRadius02r ${showRuleNumber === item.value ? "bg_LG2724a9_f5e5e5 color_fff" : "border1S00003"}`}
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
      {showRuleNumber === 4 && AnimalRespawnExample()}
      {showRuleNumber === 5 && renderTroppsComposition(pickRace)}
    </div>
  );
}

export default FarmOasisMobile;
