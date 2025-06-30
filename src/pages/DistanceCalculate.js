import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../style/common.less";
import Selector from "./Selector";
import heroShoesList from "../config/distanceCalculateHeroShoes";
import heroLeftHandList from "../config/distanceCalculateHeroLeftHand";
function circularDistance(x1, y1, x2, y2, size, setResult) {
  // 計算x軸和y軸的差值，並考慮跨越邊界的距離
  let dx = Math.min(Math.abs(x2 - x1), size - Math.abs(x2 - x1));
  let dy = Math.min(Math.abs(y2 - y1), size - Math.abs(y2 - y1));

  // 計算直線距離
  setResult(Math.sqrt(dx * dx + dy * dy));
}

function TimeCalculate(
  totalDistance,
  speed,
  extraLevel = 0,
  timeMultiplier,
  shoeInfo,
  leftHandInfo
) {
  console.log("TimeCalculate 鞋子數字", shoeInfo.value);
  console.log("TimeCalculate 鞋子名稱", shoeInfo.label);
  let shoeValue = shoeInfo.value;
  let shoesBonus = 0;
  let bonusAfter20Grids = 0;
  if (typeof shoeValue === "number" && shoeValue !== 0) {
    shoesBonus = shoeValue;
  } else {
    let temp = shoeValue && shoeValue.split("%");
    temp = parseInt(temp[0]);
    temp = temp / 100;
    bonusAfter20Grids = temp || 0;
  }
  console.log("鞋子加速比率", shoesBonus);
  let baseSpeed = (speed + shoesBonus) * timeMultiplier;

  // 计算加速后的速度倍率
  let speedMultiplier = 1 + bonusAfter20Grids + extraLevel * 0.2;
  let acceleratedSpeed = baseSpeed * speedMultiplier;

  // 前20格的距离和时间
  let initialDistance = Math.min(totalDistance, 20);
  let initialTimeInHours = initialDistance / baseSpeed;
  //console.log("前20格時間", initialTimeInHours);
  // 超过20格的距离和时间
  let remainingDistance = Math.max(0, totalDistance - 20);
  let remainingTimeInHours = remainingDistance / acceleratedSpeed;
  //console.log("20格之後的時間", remainingTimeInHours);
  // 总时间（小时）
  let totalTimeInHours = initialTimeInHours + remainingTimeInHours;

  // 计算小时、分钟和秒
  let hours = Math.floor(totalTimeInHours);
  let minutes = Math.floor((totalTimeInHours - hours) * 60);
  let seconds = Math.round(((totalTimeInHours - hours) * 60 - minutes) * 60);

  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }

  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }

  // 格式化时间，确保两位数
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
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
  const [shoeInfo, setShoeInfo] = useState({});
  const [LeftHand] = useState(0);
  const [leftHandInfo, setLeftHandInfo] = useState({});
  const JjcItem = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    },
    {
      value: 6,
      label: 6,
    },
    {
      value: 7,
      label: 7,
    },
    {
      value: 8,
      label: 8,
    },
    {
      value: 9,
      label: 9,
    },
    {
      value: 10,
      label: 10,
    },
    {
      value: 11,
      label: 11,
    },
    {
      value: 12,
      label: 12,
    },
    {
      value: 13,
      label: 13,
    },
    {
      value: 14,
      label: 14,
    },
    {
      value: 15,
      label: 15,
    },
    {
      value: 16,
      label: 16,
    },
    {
      value: 17,
      label: 17,
    },
    {
      value: 18,
      label: 18,
    },
    {
      value: 19,
      label: 19,
    },
    {
      value: 20,
      label: 20,
    },
  ];
  const map = [
    {
      value: 401,
      label: 401,
    },
    {
      value: 501,
      label: 501,
    },
    {
      value: 601,
      label: 601,
    },
  ];

  const ArchitectureItem = [
    {
      value: 0.3333333333333333,
      label: "0.33x",
    },
    {
      value: 0.5,
      label: "0.5x",
    },
    {
      value: 0.6666666666666666,
      label: "0.67x",
    },
    {
      value: 1,
      label: "一",
    },
    {
      value: 1.5,
      label: "1.5x",
    },
    {
      value: 2,
      label: "2x",
    },
    {
      value: 3,
      label: "3x",
    },
  ];
  const handleChangeJJCLV = (value) => {
    setJJCLV(value); // 更新 JJCLV 状态为当前选中的值
    console.log(`selected ${value}`);
  };
  const handleChangeArchiLv = (value) => {
    setArti(value); // 更新 JJCLV 状态为当前选中的值
    console.log(`selected ${value}`);
  };
  function troopsSpeendBlock(result, JJCLV, arti, shoeInfo, leftHandInfo) {
    let returnResult = [];
    let speedArray = [3, 4, 5, 6, 7, 9, 10, 13, 14, 16, 17, 19];
    for (let i of speedArray) {
      returnResult.push(
        <div className="flex wid100">
          <div className="wid35 hei1p6r l-hei1p6r  txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 ">
            {i}
          </div>
          <div className="wid65 hei1p6r l-hei1p6r txt-center borderRight1S00003 borderBottom1S00003">
            {result > 0
              ? TimeCalculate(result, i, JJCLV, arti, shoeInfo, leftHandInfo)
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
        <div className="wid15">
          <div className="flex wid100">
            <div className="mRight_05">
              <input
                placeholder="X1"
                onChange={(e) => setX1(e.target.value)}
                className="wid2r hei2r txt-center"
              ></input>
            </div>
            <div>
              <input
                placeholder="Y1"
                onChange={(e) => setY1(e.target.value)}
                className="wid2r hei2r txt-center"
              ></input>
            </div>
            <div className="hei2p2r l-hei2p2r mRight_05 mLeft_05 fw-bold">
              到
            </div>
            <div className="mRight_05">
              <input
                placeholder="X2"
                onChange={(e) => setX2(e.target.value)}
                className="wid2r hei2r txt-center"
              ></input>
            </div>
            <div className="mRight_05">
              <input
                placeholder="Y2"
                onChange={(e) => setY2(e.target.value)}
                className="wid2r hei2r txt-center"
              ></input>
            </div>
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center ">
            <div className="wid35 fw-bold">地圖大小</div>
            <Selector item={map} value={mapSize} onChange={setMapSize} />
          </div>

          <div className="flex wid100 mTop_05 mRigh_05 align-center ">
            <div className="wid35 fw-bold">競技場等級</div>
            <div>
              <Selector
                item={JjcItem}
                value={JJCLV}
                onChange={handleChangeJJCLV}
              />
            </div>
          </div>
          {/*
            <div className='mRight_05'>
                <input placeholder='地圖大小預設為401' onChange={(e)=>setDistance(e.target.value)} className='hei2r wid8r txt-center'></input>
            </div>
            */}
          <div className="flex wid100 mTop_05 mRigh_05 align-center ">
            <div className="wid35 fw-bold">神器加成</div>
            <Selector
              item={ArchitectureItem}
              value={arti}
              onChange={handleChangeArchiLv}
            />
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center ">
            <div className="wid35 fw-bold">英雄鞋子</div>
            <Selector
              item={heroShoesList}
              value={heroShoes}
              onChange={handleShoesOnChange}
            />
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center hei1r l-hei1r">
            {shoeInfo && shoeInfo.description}
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center ">
            <div className="wid35 fw-bold">英雄左手</div>
            <Selector
              item={heroLeftHandList}
              value={LeftHand}
              onChange={handleLeftHandOnChange}
            />
          </div>
          <div className="flex wid100 mTop_05 mRigh_05 align-center hei1r l-hei1r">
            {leftHandInfo && leftHandInfo.description}
          </div>

          <div className="flex wid100 mTop_05 mRigh_05 align-center ">
            <div className="hei2p2r l-hei2p2r wid35 fw-bold">距離為</div>
            <div className="hei2r l-hei2r wid20 pTop_01 pRight_03 pBot_01 txt-center borderRadius04r border1SD9D9D9">
              {result.toFixed(2)}
            </div>
          </div>

          <div className="wid100">
            <div
              className="mTop_05 mRight_05 mLeft_35p troopsCalCulator hei2r l-hei2r border1S00003 pTop_01 pRight_1 pBot_01 pLeft_1 borderRadius05r wid4r txt-center"
              onClick={() =>
                circularDistance(x1, y1, x2, y2, mapSize, setResult)
              }
            >
              計算
            </div>
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
        <div className="wid15">
          <div className="flex wid100">
            <div className="fw-bold wid35 txt-center hei2r l-hei2r borderTop1S00003 borderRight1S00003 borderBottom1S00003 borderLeft1S00003">
              兵種速度
            </div>
            <div className="fw-bold wid65 txt-center hei2r l-hei2r borderTop1S00003 borderRight1S00003 borderBottom1S00003 ">
              行軍所需時間
            </div>
          </div>
          {troopsSpeendBlock(result, JJCLV, arti, shoeInfo, leftHandInfo)}
        </div>
        <div className="wid40"> </div>
      </div>
    </div>
  );
}

export default DistanceCalculate;
