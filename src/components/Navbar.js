import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/common.less";
function Navbar() {
  let navigate = useNavigate();

  const handleNavigate = (params) => {
    navigate(params);
  };

  return (
    <div className="flex">
      <div
        className="NavarButton widFit mAll_05 border1S00003 pAll_05 borderRadius05r fs1r hei1r l-hei1r bg_f5f5f5 fw-bold"
        onClick={() => handleNavigate("/")}
      >
        回到首頁
      </div>
      <div
        className="NavarButton widFit mAll_05 border1S00003 pAll_05 borderRadius05r fs1r hei1r l-hei1r bg_f5f5f5 fw-bold"
        onClick={() => handleNavigate("/FarmOasis")}
      >
        關於刷綠
      </div>
      <div
        className="NavarButton widFit mAll_05 border1S00003 pAll_05 borderRadius05r fs1r hei1r l-hei1r bg_f5f5f5 fw-bold"
        onClick={() => handleNavigate("/BuildingList")}
      >
        建築資源列表(建築資源計算器)
      </div>
      <div
        className="NavarButton widFit mAll_05 border1S00003 pAll_05 borderRadius05r fs1r hei1r l-hei1r bg_f5f5f5 fw-bold"
        onClick={() => handleNavigate("/DistanceCalculate")}
      >
        行軍計算器
      </div>
      <div
        className="NavarButton widFit mAll_05 border1S00003 pAll_05 borderRadius05r fs1r hei1r l-hei1r bg_f5f5f5 fw-bold"
        onClick={() => handleNavigate("/AttackWaveAnalyzer")}
      >
        攻波分析器
      </div>
    </div>
  );
}

export default Navbar;
