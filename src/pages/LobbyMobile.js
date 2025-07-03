import { useState } from "react";
import NavbarMobile from "../components/NavbarMobile";
import "../style/common.less";
import renderUpdateRecord from "../utilis/renderLobbyUpdateRecoreds";
import funGuysIcon from "../images/funGuysIcon20250703ver.png";
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

function LobbyMobile() {
  const [account, setAccount] = useState(null);
  const [pwd, setPwd] = useState(null);
  const [original, setOriginal] = useState(false);
  const [showTipMsg, setShowTipMsg] = useState(false);
  let memberJudge = JSON.parse(sessionStorage.getItem("FunguysMember"));
  return (memberJudge || original) === true ? (
    <div className="">
      <NavbarMobile />
      <div className="mLeft_5p">
        <div className="fs2r mTop_05 flex">
          <div className="wid10">
            <img className="wid100" alt="" src={funGuysIcon} />
          </div>
          <div className="mLeft_05">放牛班資料庫 </div>
        </div>
        <div className="mTop_05">patch Note.</div>
        {renderUpdateRecord(
          "mobile hei21r flowAuto wid90 mTop_1 pTop_2 borderTop1S00003 borderBottom1S00003"
        )}
        <div className="mTop_2r">資料錯誤，bug回報 請截圖聯繫草</div>
      </div>
    </div>
  ) : (
    <div className="txt-center hei100vh wid100">
      <div className="pRelative top_35">
        <div className="wid100">
          <input
            className="hei25r l-hei25r fs1r wid40 pLeft_05 border1S7E7E7E borderRadius05r"
            placeholder="請輸入帳號"
            onChange={(e) => setAccount(e.target.value)}
          ></input>
        </div>
        <input
          className="hei25r l-hei25r fs1r wid40 pLeft_05 border1S7E7E7E mTop_1 borderRadius05r"
          placeholder="請輸入密碼"
          onChange={(e) => setPwd(e.target.value)}
        ></input>
        <div
          className="loginButton mTop_1 mRight_auto mLeft_auto wid25 border1Sblack borderRadius03r "
          onClick={() =>
            handleOnSubmit(account, pwd, setOriginal, setShowTipMsg)
          }
        >
          送出
        </div>
      </div>

      <div className="color_cf2321">
        {showTipMsg ? "帳號或密碼輸入錯誤" : null}
      </div>
    </div>
  );
}

export default LobbyMobile;
