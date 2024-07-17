import React, { useState } from "react";
import Navbar from "./Navbar";
import resourcesList from "./dataFile/ResourceRecord/resourcesList";
import "../style/common.less";
function renderTotalResources(
  calculator,
  setCalculator,
  saveArray,
  setSaveArray,
  totalResourceArray,
  setTotalResourceArray
) {
  let resultArray = [];
  for (let i in saveArray) {
    let key = Object.keys(saveArray[i])[0];
    let value = Object.values(saveArray[i])[0];
    let targetList = resourcesList[0][key];
    let target = targetList.find((a) => a.lv === value);
    resultArray.push(target);
  }
  let totalWood = 0;
  let totalBrick = 0;
  let totalIron = 0;
  let totalCorp = 0;
  let totalTotal = 0;
  for (let j in resultArray) {
    totalWood += resultArray[j].wood;
    totalBrick += resultArray[j].brick;
    totalIron += resultArray[j].iron;
    totalCorp += resultArray[j].corp;
    totalTotal += resultArray[j].total;
  }
  return (
    <div className="flex">
      <div className="wid35 txt-center border1S7E7E7E">總和</div>
      <div className="wid8 txt-center border1S7E7E7E">{totalWood}</div>
      <div className="wid8 txt-center border1S7E7E7E">{totalBrick}</div>
      <div className="wid8 txt-center border1S7E7E7E">{totalIron}</div>
      <div className="wid8 txt-center border1S7E7E7E">{totalCorp}</div>
      <div className="wid8 txt-center border1S7E7E7E">{totalTotal}</div>
    </div>
  );
}

function currentPickTargets(
  calculator,
  setCalculator,
  saveArray,
  setSaveArray,
  totalResourceArray,
  setTotalResourceArray
) {
  let groups = {};
  saveArray.forEach((item) => {
    let key = Object.keys(item)[0];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });
  Object.keys(groups).forEach((key) => {
    groups[key].sort((a, b) => a[key] - b[key]);
  });

  let sortedArray = [];
  Object.keys(groups).forEach((key) => {
    sortedArray = [...sortedArray, ...groups[key]];
  });
  return (
    <div>
      <div>
        <span className="fs20px fw-bold">當前統計之建築清單</span>{" "}
        <span className="color_cf2321">點擊不要的建築項目即可從清單中移除</span>
      </div>
      <div className="flex">
        <div className="wid35 txt-center border1S7E7E7E">建築物</div>
        <div className="wid8 txt-center border1S7E7E7E">木</div>
        <div className="wid8 txt-center border1S7E7E7E">泥</div>
        <div className="wid8 txt-center border1S7E7E7E">鐵</div>
        <div className="wid8 txt-center border1S7E7E7E">米</div>
        <div className="wid8 txt-center border1S7E7E7E">總和</div>
      </div>
      <div className="bias">
        {sortedArray.length > 0 &&
          sortedArray.map((item, index) => {
            let targetList = resourcesList[0][Object.keys(item)[0]];
            let target = targetList.find(
              (a) => a.lv === Object.values(item)[0]
            );
            return (
              <div
                className="flex buildinginCalculator"
                key={index}
                onClick={() =>
                  handleBuildLvOnClick(item, saveArray, setSaveArray)
                }
              >
                <div className="wid35 txt-center border1S7E7E7E">
                  {Object.keys(item)[0]} - 等級{Object.values(item)}
                </div>
                <div className="wid8 txt-center border1S7E7E7E">
                  {target.wood}
                </div>
                <div className="wid8 txt-center border1S7E7E7E">
                  {target.brick}
                </div>
                <div className="wid8 txt-center border1S7E7E7E">
                  {target.iron}
                </div>
                <div className="wid8 txt-center border1S7E7E7E">
                  {target.corp}
                </div>
                <div className="wid8 txt-center border1S7E7E7E">
                  {target.total}
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex mTop_05">
        <div className="wid35 txt-center border1S7E7E7E"></div>
        <div className="wid8 txt-center border1S7E7E7E">木</div>
        <div className="wid8 txt-center border1S7E7E7E">泥</div>
        <div className="wid8 txt-center border1S7E7E7E">鐵</div>
        <div className="wid8 txt-center border1S7E7E7E">米</div>
        <div className="wid8 txt-center border1S7E7E7E">總和</div>
      </div>
      <div>
        {renderTotalResources(
          calculator,
          setCalculator,
          saveArray,
          setSaveArray,
          totalResourceArray,
          setTotalResourceArray
        )}
      </div>
    </div>
  );
}
function handleBuildLvOnClick(
  NewItem,
  saveArray, //原本已經在list內的
  setSaveArray,
  mutiple,
  setMutiple,
  multipleStartItem,
  setMultipleStartItem,
  data
) {
  if (mutiple === true && Object.keys(multipleStartItem).length === 0) {
    console.log("newItem in handleBuildLvOnClick", NewItem);
    setMultipleStartItem(NewItem);
    return;
  } else if (mutiple === true && Object.keys(multipleStartItem).length !== 0) {
    let key1 = Object.keys(multipleStartItem)[0];
    let key2 = Object.keys(NewItem)[0];
    if (key1 === key2) {
      let value1 = Object.values(multipleStartItem)[0];
      let value2 = Object.values(NewItem)[0];
      [value1, value2] = [value1, value2].sort((x, y) => x - y);
      let result = [];
      for (let i = 1; i <= 100; i++) {
        if (i >= value1 && i <= value2) {
          result.push({
            [key1]: i,
          });
        }
      }
      if (saveArray.length > 0) {
        let temp = [];
        for (let j in result) {
          let flag = false;
          for (let k in saveArray) {
            if (Object.keys(result[j])[0] === Object.keys(saveArray[k])[0]) {
              if (
                Object.values(result[j])[0] === Object.values(saveArray[k])[0]
              ) {
                flag = true;
                break; // 如果找到重复的元素，直接跳出内层循环
              }
            }
          }
          if (flag === false) {
            temp.push(result[j]); // 如果在内层循环中没有找到重复的元素，添加到temp
          }
        }
        // 最后将temp合并到saveArray
        setSaveArray([...saveArray, ...temp]);
        setMutiple(!mutiple);
        setMultipleStartItem({});
      } else {
        setSaveArray(result);
        setMutiple(!mutiple);
        setMultipleStartItem({});
      }
    } else {
      setMutiple(!mutiple);
      setMultipleStartItem({});
      alert("選取多個等級時候選到兩個不同建築了，請重新操作");
    }
  } else {
    //單選區
    if (saveArray.length > 0) {
      let newItemkey = Object.keys(NewItem);
      const exist = saveArray.some(
        (item) => item[newItemkey] === NewItem[newItemkey]
      );
      if (exist) {
        const filteredArray = saveArray.filter(
          (item) => JSON.stringify(item) !== JSON.stringify(NewItem)
        );
        setSaveArray(filteredArray);
        return;
      } else {
        setSaveArray([...saveArray, NewItem]);
        return;
      }
    } else {
      setSaveArray([NewItem]);
      return;
    }
  }
}

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
    <div className="mBot_5">
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
                className={`wid4 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""}`}
              >
                {lv}
              </div>
              <div
                key={lv + "wood"}
                className={`wid6 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""}`}
              >
                {wood}
              </div>
              <div
                key={lv + "brick"}
                className={`wid6 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
              >
                {brick}
              </div>
              <div
                key={lv + "iron"}
                className={`wid6 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
              >
                {iron}
              </div>
              <div
                key={lv + "corp"}
                className={`wid6 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""}  `}
              >
                {corp}
              </div>
              <div
                key={lv + "pop"}
                className={`wid6 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
              >
                {pop}
              </div>
              <div
                key={lv + "CP"}
                className={`wid6 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
              >
                {CP}
              </div>
              <div
                key={lv + "total"}
                className={`wid6 txt-center border1S7E7E7E ${compareValue === lv ? "firstItem" : ""} `}
              >
                {total}
              </div>
            </div>
          );
        })}
    </div>
  );
}
function BuildingList() {
  const [build, setBuild] = useState(null);
  const [calculator, setCalculator] = useState(null);
  const [saveArray, setSaveArray] = useState([]);
  const [totalResourceArray, setTotalResourceArray] = useState([]);
  const [multiple, setMultiple] = useState(false);
  const [multipleStartItem, setMultipleStartItem] = useState({});
  let resources1 = [
    "伐木場",
    "泥坑",
    "鐵礦場",
    "農田",
    "鋸木廠",
    "磚廠",
    "鋼鐵鑄造廠",
    "麵粉廠",
    "麵包店",
  ]; //資源
  let resources2 = [
    "研究院",
    "兵工廠",
    "兵營",
    "大兵營",
    "馬廄",
    "大馬廄",
    "醫院",
    "競技場",
    "工廠",
  ]; //軍事
  let resources3 = [
    "村莊大樓",
    "市場",
    "倉庫",
    "穀倉",
    "大倉庫",
    "大穀倉",
    "行宮",
    "城鎮中心",
  ]; //文明
  let resources4 = [
    "土牆(條頓)",
    "城牆(羅馬)",
    "木牆(高盧)",
    "臨時牆(匈奴)",
    "石牆(埃及)",
    "釀酒廠",
    "放牧水槽",
    "陷阱機",
    "指揮中心",
    "供水系統",
  ]; //種族特色
  let resources5 = [
    "英雄宅",
    "集結點",
    "石匠鋪",
    "山洞",
    "大使館",
    "皇宮",
    "交易所",
    "寶物庫",
    "世界奇觀",
  ]; //其他
  const handleBuidingOnClick = (item) => {
    console.log("in handleBuidingOnClick");
    setMultiple(false);
    setMultipleStartItem({});
    setBuild(item);
  };
  return (
    <div className="mLeft_1">
      <Navbar />
      <div className="mLeft_1 color_brown fw-bold fs2p5r borderBottom1Sad320d ">
        建築資源計算器
      </div>
      <div className="flex mLeft_1 mTop_05">
        <div className="flex wid40 hei18r">
          <div className="wid20 ">
            <div className="txt-center borderBottom1Sblack wid80 mTop_03 mRight_auto mBot_05 mLeft_auto fw-bold hei1p7r">
              資源相關
            </div>
            {resources1.map((item1, index1) => {
              return (
                <div
                  className="build txt-center wid80 mTop_03 mRight_auto mLeft_auto border1S00003 borderRadius05r"
                  key={index1}
                >
                  <div onClick={() => handleBuidingOnClick(item1)}>{item1}</div>
                </div>
              );
            })}
          </div>
          <div className="wid20">
            <div className="txt-center borderBottom1Sblack wid80 mTop_03 mRight_auto mBot_05 mLeft_auto fw-bold hei1p7r">
              軍事相關
            </div>
            {resources2.map((item2, index2) => {
              return (
                <div
                  className="build txt-center wid80 mTop_03 mRight_auto mLeft_auto border1S00003 borderRadius05r"
                  key={index2}
                >
                  <div onClick={() => handleBuidingOnClick(item2)}>{item2}</div>
                </div>
              );
            })}
          </div>
          <div className="wid20">
            <div className="txt-center borderBottom1Sblack wid80 mTop_03 mRight_auto mBot_05 mLeft_auto fw-bold hei1p7r">
              每村常見建築
            </div>
            {resources3.map((item3, index3) => {
              return (
                <div
                  className="build txt-center wid80 mTop_03 mRight_auto mLeft_auto border1S00003 borderRadius05r"
                  key={index3}
                >
                  <div onClick={() => handleBuidingOnClick(item3)}>{item3}</div>
                </div>
              );
            })}
          </div>
          <div className="wid20">
            <div className="txt-center borderBottom1Sblack wid80 mTop_03 mRight_auto mBot_05 mLeft_auto fw-bold hei1p7r">
              種族特色建築
            </div>
            {resources4.map((item4, index4) => {
              return (
                <div
                  className="build txt-center wid80 mTop_03 mRight_auto mLeft_auto border1S00003 borderRadius05r"
                  key={index4}
                >
                  <div onClick={() => handleBuidingOnClick(item4)}>{item4}</div>
                </div>
              );
            })}
          </div>
          <div className="wid20">
            <div className="txt-center borderBottom1Sblack wid80 mTop_03 mRight_auto mBot_05 mLeft_auto fw-bold hei1p7r">
              其他建築
            </div>
            {resources5.map((item5, index5) => {
              return (
                <div
                  className="build txt-center wid80 mTop_03 mRight_auto mLeft_auto border1S00003 borderRadius05r"
                  key={index5}
                >
                  <div onClick={() => handleBuidingOnClick(item5)}>{item5}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="wid50 mTop_03 mLeft_10p pRelative">
          <div className="pAbsolute wid100">
            {currentPickTargets(
              calculator,
              setCalculator,
              saveArray,
              setSaveArray,
              totalResourceArray,
              setTotalResourceArray
            )}
          </div>
        </div>
      </div>
      <div className="mTop_3 mLeft_1">
        <div className="flex">
          <div className="mBot_1 color_0600ff l-hei12r hei12r wid30">
            {build}
          </div>
          <div className="mBot_1 color_0600ff l-hei12r hei12r wid50 flex ">
            <div
              className={"hei12r wid12r border2S7E7E7E mRight_1 pRelative"}
              onClick={() => setMultiple(!multiple)}
            >
              <div
                className={`${multiple ? "wid04r hei07r transform_45 pAbsolute top_01 left_035 borderRight2SCF2321 borderBottom2SCF2321" : "B"}`}
              ></div>
            </div>
            <div>選取多個等級</div>
          </div>
        </div>
        <div className="flex">
          <div className="wid4 txt-center border1S7E7E7E">等級</div>
          <div className="wid6 txt-center border1S7E7E7E">木</div>
          <div className="wid6 txt-center border1S7E7E7E">泥</div>
          <div className="wid6 txt-center border1S7E7E7E">鐵</div>
          <div className="wid6 txt-center border1S7E7E7E">米</div>
          <div className="wid6 txt-center border1S7E7E7E">人口</div>
          <div className="wid6 txt-center border1S7E7E7E">文明點</div>
          <div className="wid6 txt-center border1S7E7E7E">總和</div>
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

export default BuildingList;
