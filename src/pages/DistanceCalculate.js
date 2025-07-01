import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../style/common.less";
import Selector from "./Selector";
import heroShoesList from "../config/distanceCalculateHeroShoes";
import heroLeftHandList from "../config/distanceCalculateHeroLeftHand";
import architectureItem from "../config/distanceCalculateArchitectureItem";
import mapSizeList from "../config/distanceCalculateMapSize";
import tournamentSquareLevelList from "../config/distanceCalculateTSLevelList";
import calculateTime from "../utilis/distanceCalculate_CalculateTime";
import circulateDistance from "../utilis/distanceCalculate_CalculateDistance";
function TimeCalculateGo(...args) {
  return calculateTime(...args, false);
}

function TimeCalculateBack(...args) {
  return calculateTime(...args, true);
}

function DistanceCalculate() {
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
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
  function troopsSpeendBlock(result, JJCLV, arti, shoeInfo, leftHandInfo) {
    let returnResult = [];
    let speedArray = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    ];
    for (let i of speedArray) {
      returnResult.push(
        <div className="flex wid100">
          <div className="wid30 hei1p6r l-hei1p6r  txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 ">
            {i}
          </div>
          <div className="wid35 hei1p6r l-hei1p6r txt-center borderRight1S00003 borderBottom1S00003">
            {result > 0
              ? TimeCalculateGo(result, i, JJCLV, arti, shoeInfo, leftHandInfo)
              : null}
          </div>
          <div className="wid35 hei1p6r l-hei1p6r txt-center borderRight1S00003 borderBottom1S00003">
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
      );
    }
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
    <div className="mLeft_1">
      <Navbar />
      <div className="mLeft_1 color_brown fw-bold fs2p5r borderBottom1Sad320d ">
        行軍計算器
      </div>
      <div className="flex mLeft_2 mTop_05">
        <div className="wid25">
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
                const dist = circulateDistance(x1, y1, x2, y2, mapSize);
                setResult(dist);
              }}
            >
              計算
            </div>
          </div>
        </div>
        <div className="wid20">
          <div className="flex wid100">
            <div className="fw-bold wid30 txt-center hei2r l-hei2r borderTop1S00003 borderRight1S00003 borderBottom1S00003 borderLeft1S00003">
              兵種速度
            </div>
            <div className="fw-bold wid35 txt-center hei2r l-hei2r borderTop1S00003 borderRight1S00003 borderBottom1S00003 ">
              去程所需時間
            </div>
            <div className="fw-bold wid35 txt-center hei2r l-hei2r borderTop1S00003 borderRight1S00003 borderBottom1S00003 ">
              回程所需時間
            </div>
          </div>
          {troopsSpeendBlock(result, JJCLV, arti, shoeInfo, leftHandInfo)}
        </div>
        <div className="wid40">
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
        </div>
      </div>
    </div>
  );
}

export default DistanceCalculate;
