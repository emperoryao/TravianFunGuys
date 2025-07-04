import React from "react";

function TroopsConfigurationMobile({ title, config }) {
  if (!config) return null;

  const renderRow = (label, value, level) => {
    if (!value || value === "-" || value.length <= 1) return null;
    return (
      <div className="flex borderBottom1SB3B3B3 txt-center hei2r l-hei2r">
        <div className="wid50 borderRight1SB3B3B3">{label}</div>
        <div className="txt-center wid50">
          {value + " ( "}
          <span className="color_cf2321">{level}</span>
          {" ) "}
        </div>
      </div>
    );
  };

  return (
    <div className="wid95 border1Sblack mTop_05">
      <div className="wid100 txt-center borderBottom1SB3B3B3 hei2r l-hei2r">
        {title}
      </div>
      {renderRow(
        "步兵1數量(等級)",
        config.infantryNo1Numbers,
        config.infantryNo1ArmorLevel
      )}
      {renderRow(
        "步兵2數量(等級)",
        config.infantryNo2Numbers,
        config.infantryNo2ArmorLevel
      )}
      {renderRow(
        "騎兵1數量(等級)",
        config.cavalryNo1Numbers,
        config.cavalryNo1ArmorLevel
      )}
      {renderRow(
        "騎兵2數量(等級)",
        config.cavalryNo2Numbers,
        config.cavalryNo2ArmorLevel
      )}
      {renderRow(
        "騎兵3數量(等級)",
        config.cavalryNo3Numbers,
        config.cavalryNo3ArmorLevel
      )}

      <div className="flex borderBottom1SB3B3B3 txt-center hei2r l-hei2r">
        <div className="wid50 borderRight1SB3B3B3">
          <span className="color_0415f5">研究院</span>
          <span className="color_972ba3">建築</span>資源
        </div>
        <div className="txt-center wid50">{config.Academy}</div>
      </div>
      <div className="flex borderBottom1SB3B3B3 txt-center hei2r l-hei2r">
        <div className="wid50 borderRight1SB3B3B3">
          <span className="color_07a30e">兵工廠</span>
          <span className="color_972ba3">建築</span>資源
        </div>
        <div className="txt-center wid50">{config.ArmorField}</div>
      </div>
      <div className="flex borderBottom1SB3B3B3 txt-center hei2r l-hei2r">
        <div className="wid50 borderRight1SB3B3B3">
          <span className="color_0415f5">研究院</span>研發資源
        </div>
        <div className="txt-center wid50">{config.Rd}</div>
      </div>
      <div className="flex borderBottom1SB3B3B3 txt-center hei2r l-hei2r">
        <div className="wid50 borderRight1SB3B3B3">
          <span className="color_07a30e">兵工廠</span>升級資源
        </div>
        <div className="txt-center wid50">{config.ArmorLvUp}</div>
      </div>
      <div className="flex borderBottom1SB3B3B3 txt-center hei2r l-hei2r">
        <div className="wid50 borderRight1SB3B3B3">
          <span className="color_07a30e">兵工廠</span>與
          <span className="color_0415f5">研究院</span>資源總合
        </div>
        <div className="txt-center wid50">{config.total}</div>
      </div>
      <div className="flex borderBottom1SB3B3B3 txt-center hei2r l-hei2r">
        <div className="wid50 borderRight1SB3B3B3">
          <span className="color_eb5054">釀酒廠</span>等級
        </div>
        <div className="txt-center wid50">{config.winery}</div>
      </div>
      <div className="flex borderBottom1SB3B3B3 txt-center align-center hei4p5r l-hei4p5r">
        <div className="wid50 borderRight1SB3B3B3">此配置優點</div>
        <div className="txt-center wid50 l-hei15r">{config.advantage}</div>
      </div>
      <div className="flex borderBottom1SB3B3B3 txt-center align-center hei4p5r l-hei4p5r">
        <div className="wid50 borderRight1SB3B3B3">此配置缺點</div>
        <div className="txt-center wid50 l-hei15r">{config.weakness}</div>
      </div>
    </div>
  );
}

export default TroopsConfigurationMobile;
