import React, { useState } from "react";
import Navbar from "./Navbar";
import "../style/common.less";
import { Timeline } from "antd";
function renderUpdateRecord() {
  return (
    <div className="mTop_12">
      <Timeline>
        <Timeline.Item>頁面始於 2024-06-27</Timeline.Item>
        <Timeline.Item>feat. 綠洲資料於 2024-06-28</Timeline.Item>
        <Timeline.Item>feat. 刷綠教學-種族配置區塊於 2024-07-01</Timeline.Item>
        <Timeline.Item>
          fix. 導航列點擊回到首頁需要重新登入bug於 2024-07-03
        </Timeline.Item>
        <Timeline.Item>
          feat. 現在登入後會自動儲存登入資訊 於 2024-07-03
        </Timeline.Item>
        <Timeline.Item>
          feat. 建築資料列表-建築資源計算器於 2024-07-04
        </Timeline.Item>
        <Timeline.Item>feat. NavbarCSS調整 於 2024-07-04</Timeline.Item>
        <Timeline.Item>feat. 建築資源列表CSS調整 於 2024-07-04</Timeline.Item>
        <Timeline.Item>
          feat. 文明點頁面相關資訊整理中 於 2024-07-04
        </Timeline.Item>
        <Timeline.Item>
          feat. 行軍計算器基礎功能 (含競技場功能) 於 2024-07-10
        </Timeline.Item>
        <Timeline.Item>
          feat. 行軍計算器新增(神器選項) 於 2024-07-11
        </Timeline.Item>
        <Timeline.Item>
          feat. 行軍計算器新增(靴子選項) 於 2024-07-15
        </Timeline.Item>
        <Timeline.Item>
          feat. 建築資源計算器新增(多選功能) 於 2024-07-16
        </Timeline.Item>
        <Timeline.Item>
          feat. 建築資源計算器統計清單現在會依照等級排序咯 於 2024-07-17
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
const handleOnSubmit = (account, pwd, setOriginal, setShowTipMsg) => {
  if (account === "Fun" && pwd === "0000") {
    sessionStorage.setItem("FunguysMember", JSON.stringify(true));
    setOriginal(true);
  } else {
    setOriginal(false);
    setShowTipMsg(true);
    return;
  }
};

function Lobby() {
  const [account, setAccount] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [original, setOriginal] = useState(false);
  const [showTipMsg, setShowTipMsg] = useState(false);
  let memberJudge = JSON.parse(sessionStorage.getItem("FunguysMember"));
  return (memberJudge || original) === true ? (
    <div className="mLeft_1">
      <Navbar />
      <div className="mLeft_1">
        <div className="fs60px">放牛班資料庫 </div>
        <div className="mTop_05">patch Note.</div>
        {renderUpdateRecord()}
        <footer>資料錯誤，bug回報 請截圖聯繫草</footer>
      </div>
    </div>
  ) : (
    <div className="txt-center mTop_4">
      <div className="wid100">
        <input
          placeholder="請輸入帳號"
          onChange={(e) => setAccount(e.target.value)}
        ></input>
      </div>
      <div className="wid100">
        <input
          placeholder="請輸入密碼"
          onChange={(e) => setPwd(e.target.value)}
        ></input>
      </div>
      <div
        className="loginButton mTop_05 mRight_auto mLeft_auto wid5 border1Sblack borderRadius03r "
        onClick={() => handleOnSubmit(account, pwd, setOriginal, setShowTipMsg)}
      >
        送出
      </div>
      <div className="color_cf2321">
        {showTipMsg ? "帳號或密碼輸入錯誤" : null}
      </div>
    </div>
  );
}

export default Lobby;
