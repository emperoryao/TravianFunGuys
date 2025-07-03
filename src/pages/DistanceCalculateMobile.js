import React, { useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import "../style/common.less";
import Selector from "./Selector";
import heroShoesList from "../config/distanceCalculateHeroShoes";
import heroLeftHandList from "../config/distanceCalculateHeroLeftHand";
import architectureItem from "../config/distanceCalculateArchitectureItem";
import mapSizeList from "../config/distanceCalculateMapSize";
import tournamentSquareLevelList from "../config/distanceCalculateTSLevelList";
import calculateTime from "../utilis/distanceCalculate_CalculateTime";
import circulateDistanceMobile from "../utilis/distanceCalculate_CalculateDistanceMobile";
import troopsData from "../config/troopsData";
function TimeCalculateGo(...args) {
  return calculateTime(...args, false);
}

function TimeCalculateBack(...args) {
  return calculateTime(...args, true);
}
function DistanceCalculateMobile() {
  const [x1, setX1] = useState(null);
  const [y1, setY1] = useState(null);
  const [x2, setX2] = useState(null);
  const [y2, setY2] = useState(null);
  const [JJCLV, setJJCLV] = useState(0);
  const [mapSize, setMapSize] = useState(401);
  const [result, setResult] = useState(0);
  const [arti, setArti] = useState(1);
  const [heroShoes] = useState(0);
  const [shoeInfo, setShoeInfo] = useState({
    value: 0,
    label: "一",
    description: "--",
  });
  const [LeftHand] = useState(0);
  const [leftHandInfo, setLeftHandInfo] = useState({
    value: "一",
    label: "一",
    description: "--",
    bonus: 0,
  });

  const handleChangeJJCLV = (value) => {
    setJJCLV(value);
  };
  const handleChangeArchiLv = (value) => {
    setArti(value);
  };
  function getTroopsBySpeed(troopsData) {
    console.log("getTroopsBySpeed執行了");
    const result = {};
    const seenNames = new Set();

    Object.entries(troopsData).forEach(([race, units]) => {
      const raceMark = race[0]; // 取種族第一字（例如："匈奴" => "匈"）

      Object.entries(units).forEach(([unitName, unitData]) => {
        const speed = unitData["速度"];
        if (!speed) return;

        const akaName = unitData.akaName;
        const baseName = akaName || unitName;

        // 已經收錄過就跳過
        if (seenNames.has(baseName)) return;
        seenNames.add(baseName);

        // 是否為共用名稱（akaName 包含 "(全)"）
        const isGlobalAka = !!akaName && akaName.includes("(全)");
        const isZui = baseName.includes("嘴");
        const isGaulHero = baseName.includes("高盧英雄");
        // 預設名稱
        let displayName = baseName;

        // 判斷是否需要加種族註記
        if (!isGlobalAka && !isZui && !isGaulHero) {
          displayName += `(${raceMark})`;
        }

        // 加入結果
        if (!result[speed]) result[speed] = [];
        result[speed].push(displayName);
      });
    });

    // 最終格式：速度為 key，名稱用 "、" 串起
    const formattedResult = {};
    for (const [speed, names] of Object.entries(result)) {
      formattedResult[speed] = names.join("、");
    }

    return formattedResult;
  }

  // 使用方法
  const troopsSpeed = getTroopsBySpeed(troopsData);

  function troopsSpeendBlock(result, JJCLV, arti, shoeInfo, leftHandInfo) {
    let returnResult = [];
    let speedArray = [3, 4, 5, 6, 7, 9, 10, 13, 14, 15, 16, 17, 19, 20, 22, 25];

    returnResult = speedArray.map((i, index) => {
      const isEven = index % 2 === 0;
      return (
        <div key={i} className={`${isEven ? "bg_e3fdff" : "bg_f7f7f7"}`}>
          <div className="flex wid100 hei1p6r l-hei1p6r borderBottom1S00003 borderRight1S00003 borderLeft1S00003">
            <div className="wid20 txt-center borderRight1S00003">{i}</div>
            <div className="wid40 txt-center borderRight1S00003">
              {result > 0
                ? TimeCalculateGo(
                    result,
                    i,
                    JJCLV,
                    arti,
                    shoeInfo,
                    leftHandInfo
                  )
                : null}
            </div>
            <div className="wid40 txt-center ">
              {result > 0
                ? TimeCalculateBack(
                    result,
                    i,
                    JJCLV,
                    arti,
                    shoeInfo,
                    leftHandInfo
                  )
                : null}
            </div>
          </div>
          <div
            className={`flex wid100 align-center borderBottom1S00003 borderLeft1S00003 borderRight1S00003 l-hei1p6r ${
              i === 6 || i === 7 ? "hei3p2r" : "hei1p6r"
            }`}
          >
            <div className="fw-bold wid20 txt-center ">兵種</div>
            <div className="wid80 txt-center borderLeft1S00003">
              {troopsSpeed[i]}
            </div>
          </div>
        </div>
      );
    });

    return returnResult;
  }
  const handleShoesOnChange = (e) => {
    let shoeInfo = heroShoesList.find((item) => item.value === e);
    setShoeInfo(shoeInfo);
  };
  const handleLeftHandOnChange = (e) => {
    let leftHandInfo = heroLeftHandList.find((item) => item.value === e);
    setLeftHandInfo(leftHandInfo);
  };
  return (
    <div className="">
      <NavbarMobile />
      <div className="mLeft_1 color_brown fw-bold fs1p5r borderBottom1Sad320d">
        行軍計算器
      </div>
      <div className="flex mLeft_1 mTop_05 flexWrap_wrap pBot_4p5">
        <div className="wid100">
          <div className="flex wid100 hei2r l-hei2r">
            <div className="wid40 flex">
              <div className="wid50 txt-center">
                <input
                  placeholder="X1"
                  onChange={(e) => setX1(e.target.value)}
                  className="wid80 hei80 txt-center"
                ></input>
              </div>
              <div className="wid50 txt-center">
                <input
                  placeholder="Y1"
                  onChange={(e) => setY1(e.target.value)}
                  className="wid80 hei80 txt-center"
                ></input>
              </div>
            </div>
            <div className="wid5">到</div>
            <div className="wid40 flex">
              <div className="wid50 txt-center">
                <input
                  placeholder="X2"
                  onChange={(e) => setX2(e.target.value)}
                  className="wid80 hei80 txt-center"
                ></input>
              </div>
              <div className="wid50 txt-center">
                <input
                  placeholder="Y2"
                  onChange={(e) => setY2(e.target.value)}
                  className="wid80 hei80 txt-center"
                ></input>
              </div>
            </div>
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center color_gray">
            <div className="wid40 fw-bold">地圖大小</div>
            <div className="wid54 mLeft_6p">
              <Selector
                defaultValue={mapSize}
                item={mapSizeList}
                value={mapSize}
                onChange={setMapSize}
              />
            </div>
          </div>

          <div className="flex wid100 mTop_05 mRigh_05 align-center color_gray">
            <div className="wid40 fw-bold">競技場等級</div>
            <div className="wid54 mLeft_6p">
              <Selector
                defaultValue={JJCLV}
                item={tournamentSquareLevelList}
                value={JJCLV}
                onChange={handleChangeJJCLV}
              />
            </div>
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center color_gray">
            <div className="wid40 fw-bold">神器加成</div>
            <div className="wid54 mLeft_6p">
              <Selector
                defaultValue={arti}
                item={architectureItem}
                value={arti}
                onChange={handleChangeArchiLv}
              />
            </div>
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center color_gray">
            <div className="wid40 fw-bold">英雄鞋子</div>
            <div className="wid54 mLeft_6p">
              <Selector
                defaultValue={shoeInfo}
                item={heroShoesList}
                value={heroShoes}
                onChange={handleShoesOnChange}
              />
            </div>
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center hei1r l-hei1r color_0600ff">
            裝備描述
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center hei1r l-hei1r color_cf2321">
            {shoeInfo && shoeInfo.description}
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center color_gray">
            <div className="wid40 fw-bold">英雄左手</div>

            <div className="wid54 mLeft_6p">
              <Selector
                defaultValue={leftHandInfo}
                item={heroLeftHandList}
                value={LeftHand}
                onChange={handleLeftHandOnChange}
              />
            </div>
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center hei1r l-hei1r color_0600ff">
            裝備描述:
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center hei1r l-hei1r color_cf2321">
            {leftHandInfo && leftHandInfo.description}
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center ">
            <div className="hei2p2r l-hei2p2r wid40 fw-bold color_gray">
              距離為
            </div>
            <div className="wid20 mLeft_6p pTop_01 pRight_03 pBot_01 txt-center borderRadius04r border1SD9D9D9">
              {result.toFixed(2)}
            </div>
          </div>

          <div className="wid100">
            <div
              className="mTop_05 mRight_05 mLeft_35p troopsCalCulator hei2r l-hei2r border1S00003 pTop_01 pRight_1 pBot_01 pLeft_1 borderRadius05r wid4r txt-center"
              onClick={() => {
                const dist = circulateDistanceMobile(x1, y1, x2, y2, mapSize);
                setResult(dist ? dist : 0);
              }}
            >
              計算
            </div>
          </div>
        </div>

        <div className="wid97p5 mTop_1">
          <div>
            <div className="flex wid100 borderTop1S00003 borderRight1S00003 borderBottom1S00003 borderLeft1S00003">
              <div className="fw-bold wid20 txt-center hei2r l-hei2r borderRight1S00003">
                移速/hr
              </div>
              <div className="fw-bold wid40 txt-center hei2r l-hei2r borderRight1S00003">
                去程所需時間
              </div>
              <div className="fw-bold wid40 txt-center hei2r l-hei2r">
                回程所需時間
              </div>
            </div>
          </div>
          {troopsSpeendBlock(result, JJCLV, arti, shoeInfo, leftHandInfo)}
        </div>

        {/*<div className="wid30">
          <div>注意事項</div>
          <ol>
            <li>
              在官方的旅行模擬器中，最慢單位的速度為必填單位而馬刺系列完全不影響速度
            </li>
            <li>
              在此模擬器中，馬刺系列加成會直接加在兵種速度上，例如兵種速度3+設置小馬刺，實際為每小時6格行軍速度。
            </li>
            <li>
              當然我們知道小馬刺生效的情境下，行軍速度永遠不可能是每小時6格，但+3/4/5還是可以用作移動速度推導。
            </li>
          </ol>
        </div>*/}
      </div>
    </div>
  );
}

export default DistanceCalculateMobile;
