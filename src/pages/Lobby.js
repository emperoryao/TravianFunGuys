import { useState } from "react";
import Navbar from "../components/Navbar";
import "../style/common.less";
import renderUpdateRecord from "../utilis/renderLobbyUpdateRecoreds";
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
        <div className="mTop_05 txt-underline">patch Note.</div>
        {renderUpdateRecord("hei30r flowAuto wid30 pTop_2 deskTop")}
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
