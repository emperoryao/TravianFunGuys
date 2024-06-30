import React, { useState } from 'react';
import Navbar from './Navbar';
import '../style/common.less';
import { Timeline } from 'antd';
const temp={'account':'Fun','password':'0000'}
function renderUpdateRecord (){
    return(
      <div className='mTop_12'>
    <Timeline>
      <Timeline.Item>頁面始於 2024-06-27</Timeline.Item>
      <Timeline.Item>新增綠洲資料於 2024-06-28</Timeline.Item>
      <Timeline.Item>新增刷綠教學-種族配置區塊於 2024-07-01</Timeline.Item>
  </Timeline></div>)
}
const handleOnSubmit=(account,pwd,setOriginal)=>{
  if(account=='Fun'&&pwd=='0000'){
    console.log('帳密正確')
  setOriginal(true)}
  else{
   console.log('帳密錯誤')
    setOriginal(false)
    return
  }
  }


function handleInputAccount(e){

}
function Lobby() {  
  const [account,setAccount]=useState(null)
  const [pwd,setPwd]=useState(null)
  const [original,setOriginal]=useState(false)

    return (
      original==true?
      <div>
        <Navbar/>
        <div className='fs60px'>放牛班資料庫 </div>
        <div className=''>更新紀錄:</div>
        {renderUpdateRecord()}
        <footer>資料錯誤，bug回報 請截圖聯繫草</footer>
      </div>:
      <div className='txt-center mTop_4'>
      <div className='wid100'><input placeholder='請輸入帳號' onChange={(e)=>setAccount(e.target.value)}></input></div>
      <div className='wid100'><input placeholder='請輸入密碼' onChange={(e)=>setPwd(e.target.value)}></input></div>
        <div onClick={()=>handleOnSubmit(account,pwd,setOriginal)}> 送出</div>
      </div>

    );
  }
  
  export default Lobby;