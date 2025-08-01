import React, { useState } from "react";
import circulateDistance from "../utilis/distanceCalculate_CalculateDistance";
import calculateTime from "../utilis/distanceCalculate_CalculateTime";
import Navbar from "../components/Navbar";
import "../style/common.less";
import { Radio, Checkbox } from "antd";

function AttackWaveAnalyzer() {
  const [origins, setOrigins] = useState([
    {
      x: "",
      y: "",
      name: "",
      speedOptions: { "1x": true, "1.5x": true, "2x": true },
      unitType: "both", // "catapult", "ram", "both"
      jjcMode: "known", // 已知 / 推測
      jjcKnown: "",
      jjcStart: "",
      jjcEnd: "",
    },
  ]);
  const [arrivalTime, setArrivalTime] = useState(
    new Date().toISOString().slice(0, 19)
  );
  const [inactiveMinutes, setInactiveMinutes] = useState(50); // 未登入分鐘
  const [results, setResults] = useState([]);
  const [underAtkX, setUnderAtkX] = useState(0);
  const [underAtkY, setUnderAtkY] = useState(0);
  const [currentMode, setCurrentMode] = useState(0); // 0: 推算JJC, 1: 推算發兵時間

  const RadioGroup = Radio.Group;

  /** 速度組：travel speed = 地圖速度(1/1.5/2倍) + 衝/投本身差異 */
  const baseSpeedGroups = [
    { label: "1x投車", speed: 3, type: "catapult" },
    { label: "1.5x投車", speed: 4.5, type: "catapult" },
    { label: "2x投車", speed: 6, type: "catapult" },
    { label: "1x衝車", speed: 4, type: "ram" },
    { label: "1.5x衝車", speed: 6, type: "ram" },
    { label: "2x衝車", speed: 8, type: "ram" },
  ];

  /** yyyy-MM-ddTHH:mm 轉 Date（無效則跳出提示） */
  const parseTime = (timeStr) => {
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) {
      alert("請輸入正確的年月日時分秒");
      return new Date();
    }
    return date;
  };

  /** 新增攻擊來源列 */
  const handleAddOrigin = () => {
    setOrigins([
      ...origins,
      {
        x: "",
        y: "",
        name: "",
        speedOptions: { "1x": true, "1.5x": true, "2x": true },
        unitType: "both",
        jjcMode: "known",
        jjcKnown: "",
        jjcStart: "",
        jjcEnd: "",
      },
    ]);
  };

  /** 單格輸入變動 */
  const handleChangeOrigin = (index, field, value) => {
    const newOrigins = [...origins];
    newOrigins[index][field] = value;
    setOrigins(newOrigins);
  };

  /** 主計算 */
  const handleCalculate = () => {
    if (!underAtkX || !underAtkY || origins.length === 0) {
      alert("請輸入完整座標");
      return;
    }
    if (currentMode === 1) {
      for (const { jjcMode, jjcStart, jjcEnd } of origins) {
        if (jjcMode === "range") {
          const startVal = jjcStart === "" ? 0 : Number(jjcStart);
          const endVal = jjcEnd === "" ? 20 : Number(jjcEnd);
          if (startVal > endVal) {
            alert("競技場區間輸入有誤：起始等級不可大於結束等級");
            return; // 直接中斷計算
          }
        }
      }
    }

    const now = new Date();
    const arrivalDate = parseTime(arrivalTime);

    // ---------- Mode 0 先算可接受的行軍時間區間 ----------
    let minTravelSec = 0;
    let maxTravelSec = 0;
    if (currentMode === 0) {
      const diffSec = Math.floor((arrivalDate - now) / 1000); // 抵達距今秒
      if (diffSec <= 0) {
        alert("抵達時間必須在未來");
        return;
      }
      minTravelSec = diffSec;
      maxTravelSec = diffSec + inactiveMinutes * 60;
    }
    // --------------------------------------------------------

    let calcResults = [];

    origins.forEach((origin) => {
      if (!origin.x || !origin.y) return;

      // 計算兩點距離（Travian 地圖 401 × 401）
      const dist = circulateDistance(
        Number(origin.x),
        Number(origin.y),
        Number(underAtkX),
        Number(underAtkY),
        401
      );

      // 取得要枚舉的競技場等級
      let jjcLevels = [];
      if (currentMode === 0) {
        // 反推模式：直接枚舉 0-20
        jjcLevels = Array.from({ length: 21 }, (_, i) => i);
      } else {
        // 發兵時間模式：沿用原本使用者輸入
        if (origin.jjcMode === "known" && origin.jjcKnown !== "") {
          const known = Math.max(0, Math.min(20, Number(origin.jjcKnown)));
          jjcLevels = [known];
        } else {
          const start =
            origin.jjcStart !== "" ? Math.max(0, Number(origin.jjcStart)) : 0;
          const end =
            origin.jjcEnd !== "" ? Math.min(20, Number(origin.jjcEnd)) : 20;
          if (start <= end) {
            jjcLevels = Array.from(
              { length: end - start + 1 },
              (_, i) => start + i
            );
          }
        }
      }

      // 速度組枚舉
      baseSpeedGroups.forEach((sg) => {
        // 勾選速度倍率
        const isSelected =
          (sg.label.startsWith("1x") && origin.speedOptions["1x"]) ||
          (sg.label.startsWith("1.5x") && origin.speedOptions["1.5x"]) ||
          (sg.label.startsWith("2x") && origin.speedOptions["2x"]);

        // 兵種過濾
        const unitAllowed =
          origin.unitType === "both" || origin.unitType === sg.type;

        if (!isSelected || !unitAllowed) return;

        jjcLevels.forEach((jjcLv) => {
          // 呼叫你的 util 取得行軍時間字串 "HH:mm:ss"
          const travelTime = calculateTime(
            dist,
            sg.speed,
            jjcLv,
            1,
            { value: 0, label: "", description: "" }, // 英雄左手
            { value: "", label: "", description: "", bonus: 0 }, // 鞋子
            false
          );

          const [hh, mm, ss] = travelTime.split(":").map(Number);
          const travelSec = hh * 3600 + mm * 60 + ss;

          // Mode 0：若不在可行區間直接跳過
          if (
            currentMode === 0 &&
            (travelSec < minTravelSec || travelSec > maxTravelSec)
          ) {
            return;
          }

          // 發兵時間 = 抵達時間 - 行軍時間
          const launchTime = new Date(arrivalDate - travelSec * 1000);

          calcResults.push({
            origin: `(${origin.x},${origin.y})`,
            originName: origin.name || "未知村莊",
            dist: dist.toFixed(2),
            speedLabel: sg.label,
            speed: sg.speed,
            jjcLv,
            travelTime,
            launchTime: launchTime.toLocaleString("zh-TW", { hour12: false }),
            missed:
              currentMode === 0
                ? false /* 反推模式全部顯示 */
                : launchTime < now,
            launchTimestamp: launchTime.getTime(),
          });
        });
      });
    });

    // 依發兵時間排序
    calcResults.sort((a, b) => a.launchTimestamp - b.launchTimestamp);
    setResults(calcResults);
  };

  /** 切換功能模式 */
  const onRadioChange = (e) => {
    setCurrentMode(e.target.value);
  };

  // ---------------------------- JSX ----------------------------
  return (
    <div className="pBot_4p5">
      <Navbar />
      <div className="mLeft_1 fs1p5r borderBottom1Sad320d flex">
        <div className="color_brown fw-bold">攻波分析器</div>
      </div>

      {/* 參數區 */}
      <div className="mTop_1 mLeft_1">
        <div className="mBot_05">功能選擇</div>
        <RadioGroup
          onChange={onRadioChange}
          value={currentMode}
          className="mBot_1"
        >
          <Radio key="0" value={0}>
            推算攻擊波競技場等級
          </Radio>
          <Radio key="1" value={1}>
            推算潛在攻擊波發兵時間
          </Radio>
        </RadioGroup>

        {/* 受攻擊村座標 */}
        <div className="mBot_05">受攻擊座標</div>
        <div className="flex wid8">
          <input
            className="wid48 hei12r pAll_01 mRight_2p txt-center"
            type="text"
            placeholder="x座標"
            value={underAtkX}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9-]/g, "");
              if (/^-?0\d+/.test(value))
                value = value.replace(/^(-?)0+(\d+)/, "$1");
              setUnderAtkX(value);
            }}
          />
          <input
            className="wid48 hei12r pAll_01 txt-center"
            type="text"
            placeholder="y座標"
            value={underAtkY}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9-]/g, "");
              if (/^-?0\d+/.test(value))
                value = value.replace(/^(-?)0+(\d+)/, "$1");
              setUnderAtkY(value);
            }}
          />
        </div>
      </div>

      {/* 攻擊來源輸入 */}
      <div className="mTop_1 mLeft_1 ">
        <div className="mBot_05">攻擊村座標</div>
        {origins.map((item, idx) => (
          <div key={idx} className="mBot_1 flex column borderBottom1Sad320d">
            <div className="flex mBot_05 wid20">
              {/* x */}
              <input
                className="wid18 hei12r pAll_01 mRight_02 txt-center"
                type="text"
                placeholder="X座標"
                value={item.x}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9-]/g, "");
                  if (/^-?0\d+/.test(value))
                    value = value.replace(/^(-?)0+(\d+)/, "$1");
                  handleChangeOrigin(idx, "x", value);
                }}
              />
              {/* y */}
              <input
                className="wid18 hei12r pAll_01 mRight_02 txt-center"
                type="text"
                placeholder="Y座標"
                value={item.y}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9-]/g, "");
                  if (/^-?0\d+/.test(value))
                    value = value.replace(/^(-?)0+(\d+)/, "$1");
                  handleChangeOrigin(idx, "y", value);
                }}
              />
              {/* 備註 */}
              <input
                className="wid50 hei12r pAll_01 fs08r txt-center"
                placeholder="攻擊方註記"
                value={item.name}
                onChange={(e) =>
                  handleChangeOrigin(idx, "name", e.target.value)
                }
              />
            </div>

            {/* 速度倍率 / 兵種 */}
            <div className="flex mBot_05 wid33">
              <div className="wid42">
                <span className="fs09r">速度倍率：</span>
                <Checkbox.Group
                  options={["1x", "1.5x", "2x"]}
                  value={Object.keys(item.speedOptions).filter(
                    (k) => item.speedOptions[k]
                  )}
                  onChange={(checked) => {
                    const newOrigins = [...origins];
                    newOrigins[idx].speedOptions = {
                      "1x": checked.includes("1x"),
                      "1.5x": checked.includes("1.5x"),
                      "2x": checked.includes("2x"),
                    };
                    setOrigins(newOrigins);
                  }}
                />
              </div>
              <div className="wid58">
                <span className="fs09r">兵種顯示：</span>
                <Radio.Group
                  value={item.unitType}
                  onChange={(e) => {
                    const newOrigins = [...origins];
                    newOrigins[idx].unitType = e.target.value;
                    setOrigins(newOrigins);
                  }}
                >
                  <Radio value="catapult">投車</Radio>
                  <Radio value="ram">衝車</Radio>
                  <Radio value="both">衝投皆顯示</Radio>
                </Radio.Group>
              </div>
            </div>

            {/* 競技場等級（只有 Mode 1 真正生效，Mode 0 全枚舉） */}
            <div className="flex">
              <span className="fs09r mRight_02">競技場等級：</span>
              <Radio.Group
                value={item.jjcMode}
                onChange={(e) => {
                  const newOrigins = [...origins];
                  newOrigins[idx].jjcMode = e.target.value;
                  setOrigins(newOrigins);
                }}
              >
                <Radio value="known">已知競技場等級</Radio>
                {item.jjcMode === "known" ? (
                  <input
                    className="wid10 txt-center mLeft_02"
                    type="text"
                    value={item.jjcKnown}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/g, "");
                      if (value !== "")
                        value = String(
                          Math.max(0, Math.min(20, Number(value)))
                        );
                      handleChangeOrigin(idx, "jjcKnown", value);
                    }}
                  />
                ) : null}
                <Radio value="range" className="mLeft_02">
                  推測競技場區間
                </Radio>
                {item.jjcMode === "known" ? null : (
                  <>
                    <input
                      className="wid10 txt-center mLeft_02"
                      type="text" // ← 改成 text，畫面就不會出現上下箭頭
                      placeholder="起點等級"
                      value={item.jjcStart}
                      onChange={(e) => {
                        // 1. 移除非數字
                        let value = e.target.value.replace(/[^0-9]/g, "");

                        // 2. 只要不是空字串，就夾在 0–20 之間
                        if (value !== "") {
                          value = String(
                            Math.max(0, Math.min(20, Number(value)))
                          );
                        }

                        // 3. 更新 state（保持和原邏輯相同）
                        handleChangeOrigin(idx, "jjcStart", value);
                      }}
                    />
                    <span className="mLeft_02 mRight_02"> - </span>
                    <input
                      className="wid10 txt-center"
                      type="text" /* 由 number → text，去掉上下箭頭 */
                      placeholder="終點等級"
                      value={item.jjcEnd}
                      onChange={(e) => {
                        // 1. 移除非 0–9 字元
                        let value = e.target.value.replace(/[^0-9]/g, "");

                        // 2. 若非空字串則限制在 0–20 之間
                        if (value !== "") {
                          value = String(
                            Math.max(0, Math.min(20, Number(value)))
                          );
                        }

                        // 3. 更新 state
                        handleChangeOrigin(idx, "jjcEnd", value); // 若想存數字可用 Number(value)
                      }}
                    />
                  </>
                )}
              </Radio.Group>
            </div>
          </div>
        ))}
        {currentMode === 1 ? (
          <button onClick={handleAddOrigin}>新增攻擊來源</button>
        ) : null}

        {/* 抵達時間 */}
        <div className="mTop_05">
          <div className="mBot_05">攻擊波抵達時間</div>
          <input
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
          />
        </div>

        {/* Mode 0 需要未登入分鐘 */}
        {currentMode === 0 && (
          <div className="mTop_05">
            <div className="flex wid25">
              <div className="wid45">距離最後一次登帳間隔(以分鐘計)</div>
              <input
                className="wid10 txt-center mRight_02"
                type="number"
                min="0"
                value={inactiveMinutes}
                onChange={(e) => {
                  const v = Number(e.target.value.replace(/[^0-9]/g, ""));
                  setInactiveMinutes(v);
                }}
              />
              分鐘
            </div>
          </div>
        )}

        {/* 計算按鈕 */}
        <button className="mTop_05" onClick={handleCalculate}>
          計算
        </button>
      </div>

      {/* 結果顯示 */}
      <div className="mLeft_1 mTop_05">
        <h3>計算結果</h3>
        <div className="flex fw-bold">
          <div className="wid10">來源座標</div>
          <div className="wid10">攻擊方名稱</div>
          <div className="wid10">距離</div>
          <div className="wid10">速度組</div>
          <div className="wid10">競技場等級</div>
          <div className="wid10">行軍時間</div>
          <div className="wid10">發兵時間</div>
          <div className="wid10">狀態</div>
        </div>
        {results
          .filter((item) => item.missed === false)
          .map((item, idx) => (
            <div className="flex" key={idx}>
              <div className="wid10">{item.origin}</div>
              <div className="wid10">{item.originName}</div>
              <div className="wid10">{item.dist}</div>
              <div className="wid10">
                {item.speedLabel} ({item.speed})
              </div>
              <div className="wid10">{item.jjcLv}</div>
              <div className="wid10">{item.travelTime}</div>
              <div className="wid10">{item.launchTime}</div>
              <div className="wid10">{item.missed ? "已錯過" : "可行"}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AttackWaveAnalyzer;
