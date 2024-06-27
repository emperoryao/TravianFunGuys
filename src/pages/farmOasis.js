import React,{useState} from 'react';
import Navbar from './Navbar';
import { Radio } from 'antd';

function FarmOasis() {  
  const [pickRace  , setPickRace ] = useState(null)
  const [showRule  , setShowRule ] = useState(false)
  const RadioGroup = Radio.Group;

 function onRadioChange(e) {
    setPickRace(e.target.value)
  }
function renderRule(){
  return (<div>
    
    <div>核心邏輯:</div>
    <div>透過不同兵種各<span className='color_cf2321'>1隻</span> 湊出 <span className='color_cf2321'>總和攻擊力</span>超過當前綠洲怪之<span  className='color_cf2321'>防禦力總和</span>即可達成無損刷怪</div>
    
    <div>注意01:</div>
    <div>由於大象戰鬥力過高，導致遇到大象時要把大象直接擊殺的成本過高 <span>因此無損刷綠是指遇到大象以外的綠洲動物都可以清掉</span></div>

    <div>以下透過戰鬥模擬器生成範例圖:</div>

    </div>
  )
}
function showDetail(){
  console.log('pickRace in showDetail',pickRace)
  switch(pickRace){
    case 1:
      return (<div>
            <div>條頓人刷綠配置:</div>
        </div>
      )
  ;
  case 2:
    return (<div>
          <div>羅馬人刷綠配置:</div>
      </div>
    )
;
case 3:
  return (<div>
        <div>高盧人刷綠配置:</div>
    </div>
  )
;
case 4:
  return (<div>
        <div>匈奴人刷綠配置:</div>
    </div>
  )
;
case 5:
  return (<div>
        <div>埃及人刷綠配置:</div>
    </div>
  )
;
  }
}
    return (
      <div className='mLeft_1'>
        <Navbar/>
        <div>刷綠教學</div>
        <div>刷綠邏輯介紹</div>
        <div>總共分成四個環節，四個環節都非常重要，請要刷綠之前務必知悉每一個細節，以免刷綠時候操作失誤，造成事倍功半</div>
        
        <div className='border2Sf78104 widFit mTop_05 mBot_05 fw-bold' onClick={()=>setShowRule(!showRule)}>{showRule? '點擊隱藏邏輯':'點擊顯示邏輯'}</div>
        
        {showRule?renderRule():null}
        <div>
          <RadioGroup onChange={(e)=>onRadioChange(e)} >
            <Radio key="1" value={1} checked={pickRace}>條頓</Radio>
            <Radio key="2" value={2} checked={pickRace}>羅馬</Radio>
            <Radio key="3" value={3} checked={pickRace}>高盧</Radio>
            <Radio key="4" value={4} checked={pickRace}>匈奴</Radio>
            <Radio key="5" value={5} checked={pickRace}>埃及</Radio>
          </RadioGroup>
        </div>
        {pickRace?showDetail():null}
      </div>
   
    );
  }
  
  export default FarmOasis;