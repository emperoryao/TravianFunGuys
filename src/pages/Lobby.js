import React from 'react';
import Navbar from './Navbar';
import '../style/common.less';
import { Timeline } from 'antd';
function renderUpdateRecord (){
    return(
      <div className='mTop_12'>
    <Timeline>
      <Timeline.Item>頁面始於 2024-06-27</Timeline.Item>
      <Timeline.Item>新增綠洲資料於 2024-06-28</Timeline.Item>
  </Timeline></div>)
}
function Lobby() {  
    return (
      <div>
        <Navbar/>
        <div className='fs60px'>放牛班資料庫 </div>
        <div className=''>更新紀錄:</div>
        {renderUpdateRecord()}
        <footer>資料錯誤，bug回報 請截圖聯繫草</footer>
      </div>
    );
  }
  
  export default Lobby;