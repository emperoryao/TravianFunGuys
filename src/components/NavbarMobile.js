import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover, Button, Checkbox, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import menuList from "../config/menuList";
import useFavoriteMenu from "../hooks/useFavoriteMenu";
import "../style/common.less";

const MAX_FAVORITES = 4;

function NavbarMobile() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useFavoriteMenu();
  const [open, setOpen] = useState(false);
  const [tempFavorites, setTempFavorites] = useState(favorites);

  const handleSave = () => {
    if (tempFavorites.length > MAX_FAVORITES) {
      message.error("最多只能選擇 4 個常用標籤");
      return;
    }
    setFavorites(tempFavorites);
    setOpen(false);
  };

  const handleToggle = (path) => {
    setTempFavorites((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const content = (
    <div className="wid100">
      {menuList.map(({ label, path }) => (
        <div key={path} className="flex hei2r l-hei2r wid100">
          <div onClick={() => navigate(path)} className="wid90">
            {label}
          </div>
          <Checkbox
            checked={tempFavorites.includes(path)}
            onChange={() => handleToggle(path)}
          ></Checkbox>
        </div>
      ))}
      <Button
        type="primary"
        block
        onClick={handleSave}
        style={{ marginTop: 8 }}
      >
        儲存設置
      </Button>
    </div>
  );

  return (
    <div className="flex align-center p_1 bg_f5f5f5 borderB1S hei3r">
      {favorites.map((favPath) => {
        const item = menuList.find((m) => m.path === favPath);
        console.log("item", item);
        return (
          <div
            key={favPath}
            className="mLeft_1 border1S00003 borderRadius05r fs08r hei2r l-hei2r bg_white widFit pRight_05 pLeft_05"
            onClick={() => navigate(favPath)}
          >
            {item?.label || favPath}
          </div>
        );
      })}
      <Popover
        content={content}
        title="功能選單(打勾設置為常用)"
        trigger="click"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="pAbsolute right_1r">
          <Button icon={<MenuOutlined />} shape="default" />
        </div>
      </Popover>
    </div>
  );
}

export default NavbarMobile;
