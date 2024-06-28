import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import '../style/common.less';
function Navbar() {
    let navigate = useNavigate();
  
    const handleNavigate = (params) => {
      let key=params.key
      let path=menuItems[key-1].path
      navigate(path);
    };
    const menuItems=[
      {key:'1',label:'回到首頁',path:'/'},
      {key:'2',label:'刷綠教學',path:'/farmOasis'},
      {key:'3',label:'米產',path:'/page1'},
    ]
    
    return (
      <Menu className='flex txt-center Navbar' items={menuItems} onSelect={(e)=>handleNavigate(e)} />
    );
    
  }
  
  export default Navbar;