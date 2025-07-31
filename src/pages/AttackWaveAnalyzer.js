import React, { useState } from "react";
import circulateDistance from "../utilis/distanceCalculate_CalculateDistance";
import calculateTime from "../utilis/distanceCalculate_CalculateTime";

function AttackWaveAnalyzer() {
  const [origins, setOrigins] = useState([{ x: "", y: "" }]);
  const [target, setTarget] = useState({ x: "", y: "" });
  const [arrivalTime, setArrivalTime] = useState("21:00:00");
  const [inactiveMinutes, setInactiveMinutes] = useState(50);
  const [results, setResults] = useState([]);

  // 六組速度
  const speedGroups = [
    { label: "1x投車", speed: 3 },
    { label: "1.5x投車", speed: 4.5 },
    { label: "2x投車", speed: 6 },
    { label: "1x衝車", speed: 4 },
    { label: "1.5x衝車", speed: 6 },
    { label: "2x衝車", speed: 8 },
  ];

  // 時間字串轉 Date
  const parseTime = (timeStr) => {
    const [h, m, s] = timeStr.split(":").map(Number);
    const now = new Date();
    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      h,
      m,
      s
    );
    if (date < now) date.setDate(date.getDate() + 1); // 避免今天已過
    return date;
  };

  const handleAddOrigin = () => {
    setOrigins([...origins, { x: "", y: "" }]);
  };

  const handleChangeOrigin = (index, field, value) => {
    const newOrigins = [...origins];
    newOrigins[index][field] = value;
    setOrigins(newOrigins);
  };

  const handleCalculate = () => {
    if (!target.x || !target.y || origins.length === 0) {
      alert("請輸入完整座標");
      return;
    }

    const now = new Date();
    const arrivalDate = parseTime(arrivalTime);
    const minRemainSec = (arrivalDate - now) / 1000; // 基本剩餘時間（秒）
    const maxRemainSec = minRemainSec + inactiveMinutes * 60; // 加上未登帳號分鐘

    let calcResults = [];

    origins.forEach((origin) => {
      if (!origin.x || !origin.y) return;

      const dist = circulateDistance(
        Number(origin.x),
        Number(origin.y),
        Number(target.x),
        Number(target.y),
        401
      );

      speedGroups.forEach((sg) => {
        for (let jjcLv = 0; jjcLv <= 20; jjcLv++) {
          const travelTime = calculateTime(
            dist,
            sg.speed,
            jjcLv,
            1, // 神器倍率
            { value: 0, label: "", description: "" }, // 無鞋子
            { value: "", label: "", description: "", bonus: 0 }, // 無左手
            false
          );

          const [hh, mm, ss] = travelTime.split(":").map(Number);
          const travelSec = hh * 3600 + mm * 60 + ss;

          // 符合時間區間
          if (travelSec >= minRemainSec && travelSec <= maxRemainSec) {
            const launchTime = new Date(arrivalDate - travelSec * 1000);
            calcResults.push({
              origin: `(${origin.x},${origin.y})`,
              target: `(${target.x},${target.y})`,
              dist: dist.toFixed(2),
              speedLabel: sg.label,
              speed: sg.speed,
              jjcLv,
              travelTime,
              launchTime: launchTime.toLocaleTimeString("zh-TW", {
                hour12: false,
              }),
              missed: launchTime < now,
              launchTimestamp: launchTime.getTime(),
            });
          }
        }
      });
    });

    // 依發兵時間接近當前時間排序（由近到遠）
    calcResults.sort((a, b) => a.launchTimestamp - b.launchTimestamp);

    setResults(calcResults);
  };

  return (
    <div className="atk-wave-analysis">
      <h2>攻擊波分析器</h2>
      <div>
        <h3>目標座標</h3>
        <input
          placeholder="X"
          value={target.x}
          onChange={(e) => setTarget({ ...target, x: e.target.value })}
        />
        <input
          placeholder="Y"
          value={target.y}
          onChange={(e) => setTarget({ ...target, y: e.target.value })}
        />
      </div>

      <div>
        <h3>攻擊來源座標</h3>
        {origins.map((o, idx) => (
          <div key={idx}>
            <input
              placeholder="X"
              value={o.x}
              onChange={(e) => handleChangeOrigin(idx, "x", e.target.value)}
            />
            <input
              placeholder="Y"
              value={o.y}
              onChange={(e) => handleChangeOrigin(idx, "y", e.target.value)}
            />
          </div>
        ))}
        <button onClick={handleAddOrigin}>新增攻擊來源</button>
      </div>

      <div>
        <h3>抵達時間</h3>
        <input
          type="time"
          step="1"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
      </div>

      <div>
        <h3>未登帳號分鐘數</h3>
        <input
          type="number"
          value={inactiveMinutes}
          onChange={(e) => setInactiveMinutes(Number(e.target.value))}
        />{" "}
        分鐘
      </div>

      <button onClick={handleCalculate}>計算</button>

      <h3>計算結果</h3>
      <table border="1">
        <thead>
          <tr>
            <th>來源</th>
            <th>目標</th>
            <th>距離</th>
            <th>速度組</th>
            <th>競技場等級</th>
            <th>行軍時間</th>
            <th>發兵時間</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td>{r.origin}</td>
              <td>{r.target}</td>
              <td>{r.dist}</td>
              <td>
                {r.speedLabel} ({r.speed})
              </td>
              <td>{r.jjcLv}</td>
              <td>{r.travelTime}</td>
              <td>{r.launchTime}</td>
              <td>{r.missed ? "已錯過" : "可行"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttackWaveAnalyzer;
