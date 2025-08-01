import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Radio } from "antd";
import { raceChinese, raceInfo } from "../config/farmOasisRaceInfo";
import animals from "../config/farmOasisAnimalData";
import BasicDescription from "../components/FarmOasis/BasicDescription";
import AnimalRespawnLogic from "../components/FarmOasis/AnimalRespawnLogic";
import AnimalRespawnExample from "../components/FarmOasis/AnimalRespawnExample";
import TroopsConfiguration from "../components/FarmOasis/TroopsConfiguration";
function FarmOasis() {
  const [pickRace, setPickRace] = useState(1);
  const [showRuleNumber, setShowRuleNumber] = useState(1);
  const RadioGroup = Radio.Group;
  const ruleOptions = [
    { label: "基本說明", value: 1 },
    { label: "生怪週期", value: 2 },
    { label: "生怪邏輯", value: 3 },
    { label: "生怪場景示例", value: 4 },
    { label: "刷綠兵種配置", value: 5 },
  ];
  function onRadioChange(e) {
    setPickRace(e.target.value);
  }
  function renderAnimalRespawnTable() {
    return (
      <div className="mLeft_1">
        <div className="flex align-center fs1r">
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
  function renderTroppsComposition() {
    return (
      <div className="mLeft_1">
        {
          <div>
            <RadioGroup
              onChange={onRadioChange}
              value={pickRace}
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
    if (number === showRuleNumber) {
      setShowRuleNumber(0);
    } else {
      setShowRuleNumber(number);
    }
  }
  return (
    <div className="mLeft_1">
      <Navbar />
      <div className="mLeft_1 color_brown fw-bold fs2p5r borderBottom1Sad320d ">
        關於刷綠
      </div>
      <div className="mAll_1">
        <Radio.Group
          options={ruleOptions}
          onChange={(e) => handle4logicButtonOnClick(e.target.value)}
          value={showRuleNumber}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      {showRuleNumber === 1 && BasicDescription()}
      {showRuleNumber === 2 && renderAnimalRespawnTable()}
      {showRuleNumber === 3 && AnimalRespawnLogic()}
      {showRuleNumber === 4 && AnimalRespawnExample()}
      {showRuleNumber === 5 && renderTroppsComposition(pickRace)}
    </div>
  );
}

export default FarmOasis;
