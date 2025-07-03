import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import menuList from "../config/menuList";
import useFavoriteMenu from "../hooks/useFavoriteMenu";
import "../style/common.less";

const MAX_FAVORITES = 4;

function NavbarMobile() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useFavoriteMenu();
  const [open, setOpen] = useState(false);
  const [tempFavorites, setTempFavorites] = useState([...favorites]);
  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };
  const handleSave = () => {
    if (tempFavorites.length > MAX_FAVORITES) {
      message.error("最多只能選擇 4 個常用標籤");
      return;
    }
    setFavorites(tempFavorites);
    setOpen(false);
  };
  useEffect(() => {
    setTempFavorites([...favorites]); // 每次 favorites 有更新，就同步 temp
  }, [favorites]);

  const handleOptionOnClick = (path) => {
    setTempFavorites((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };
  const handleOpen = () => {
    setTempFavorites([...favorites]); // 🔁 每次開啟彈窗時強制同步
    setOpen(true);
  };
  return (
    <div className="flex align-center p_1 bg_00005 borderB1S hei3r">
      {favorites.map((favPath) => {
        const item = menuList.find((m) => m.path === favPath);
        return (
          <div
            key={favPath}
            className="mLeft_1 border1S00003 borderRadius05r fs08r hei2r l-hei2r color_fff bg_navbarButton widFit pRight_05 pLeft_05"
            onClick={() => navigate(favPath)}
          >
            {item?.label || null}
          </div>
        );
      })}
      <div className="pAbsolute right_05 wid2r" onClick={() => handleOpen()}>
        <img
          alt=""
          className="wid100 verticalMiddle"
          src={require("../images/setting20250704.png")}
        />
      </div>
      {open && (
        <div className="pAbsolute top_3 wid100 bg_navbarButton color_fff pTop_1 pBot_2 z2">
          <div className="flex mBot_05 align-center">
            <div className="wid100 txt-center fs1r">網站地圖</div>
            <div
              className="pAbsolute right_1r fs1r border1Sfff pTop_01 pRight_04 pBot_01 pLeft_04"
              onClick={() => {
                setTempFavorites([...favorites]);
                setOpen(false);
              }}
            >
              x
            </div>
          </div>
          {menuList.map(({ label, path }) => (
            <div
              key={path}
              className="flex hei2p2r l-hei2p2r wid100 align-center pLeft_30p"
            >
              <div
                onClick={() => handleNavigate(path)}
                className="txt-center wid20 mRight_10p bg_fff color_333 borderRadius1r hei1p8r l-hei1p8r"
              >
                {label}
              </div>
              <div className="wid45">
                <div
                  className="wid1p4r hei14r border2Sfff borderRadius1r pRelative"
                  onClick={() => handleOptionOnClick(path)}
                >
                  {tempFavorites.includes(path) && (
                    <div className="wid1r hei1r bg_fff borderRadius50 top_50 left_50 transform_20_20" />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            className="txt-center mTop_2r fs1r hei14r l-hei1p4r wid30 mLeft_35p border1Sfff pTop_02 pBot_02 borderRadius05r"
            onClick={() => handleSave()}
          >
            儲存常用標籤
          </div>
          <div className="txt-center mTop_1">(最多可以儲存4個常用標籤)</div>
        </div>
      )}
    </div>
  );
}

export default NavbarMobile;
