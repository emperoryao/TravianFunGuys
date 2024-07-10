import React, { useState } from 'react'
import Navbar from './Navbar';
import '../style/common.less';

function circularDistance(x1, y1, x2, y2, size,setResult) {
    // 計算x軸和y軸的差值，並考慮跨越邊界的距離
    let dx = Math.min(Math.abs(x2 - x1), size - Math.abs(x2 - x1));
    let dy = Math.min(Math.abs(y2 - y1), size - Math.abs(y2 - y1));

    // 計算直線距離
    setResult(Math.sqrt(dx * dx + dy * dy))
}

// function TimeCalculate(totalDistance,speed){
//     let totalTimeInHours = totalDistance / speed;

//     let hours = Math.round(totalTimeInHours);
//     let minutes = Math.floor((totalTimeInHours - hours) * 60);
//     let seconds = Math.round(((totalTimeInHours - hours) * 60 - minutes) * 60);

//     let formattedHours = String(hours).padStart(2, '0');
//     let formattedMinutes = String(minutes).padStart(2, '0');
//     let formattedSeconds = String(seconds).padStart(2, '0');

//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
// }
function TimeCalculate(totalDistance, speed, extraLevel, timeMultiplier) {
    // 基础速度
    let baseSpeed = speed;

    // 计算加速后的速度倍率
    let speedMultiplier = 1 + (extraLevel * 0.2);
    let acceleratedSpeed = baseSpeed * speedMultiplier;

    // 前20格的距离和时间
    let initialDistance = Math.min(totalDistance, 20);
    let initialTimeInHours = initialDistance / baseSpeed;

    // 超过20格的距离和时间
    let remainingDistance = Math.max(0, totalDistance - 20);
    let remainingTimeInHours = remainingDistance / acceleratedSpeed;

    // 总时间（小时）
    let totalTimeInHours = initialTimeInHours + remainingTimeInHours;

    // 应用时间加成
    totalTimeInHours = totalTimeInHours/timeMultiplier;

    // 计算小时、分钟和秒
    let hours = Math.floor(totalTimeInHours);
    let minutes = Math.floor((totalTimeInHours - hours) * 60);
    let seconds = Math.round(((totalTimeInHours - hours) * 60 - minutes) * 60);

    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }
    
    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }

    // 格式化时间，确保两位数
    let formattedHours = String(hours).padStart(2, '0');
    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// 使用范例1
let totalDistance1 = 100; // 总距离
let speed1 = 10; // 基础速度（时速）
let extraLevel1 = 5; // 额外等级
let result1 = TimeCalculate(totalDistance1, speed1, extraLevel1);
console.log(result1);  // 应输出：06:00:00

// 使用范例2
let totalDistance2 = 200; // 总距离
let speed2 = 10; // 基础速度（时速）
let extraLevel2 = 15; // 额外等级
let result2 = TimeCalculate(totalDistance2, speed2, extraLevel2);
console.log(result2);  // 应输出：06:30:00

function DistanceCalculate() {
  const[x1,setX1]=useState(0)
  const[y1,setY1]=useState(0)
  const[x2,setX2]=useState(0)
  const[y2,setY2]=useState(0)
  const[JJCLV,setJJCLV]=useState(0)
  const[distance,setDistance]=useState(401)
  const[result,setResult]=useState(0)
  const[arti,setArti]=useState(1)
  return (
    <div className='mLeft_1'>
        <Navbar/>
        <div  className='mLeft_1 color_brown fw-bold fs2p5r borderBottom1Sad320d '>行軍計算器</div>
        <div className='flex mLeft_2 mTop_05'>
            <div className='mRight_05'>
                <input placeholder='X1' onChange={(e)=>setX1(e.target.value)} className='wid2r hei2r txt-center'></input>
            </div>
            <div>
                <input placeholder='Y1' onChange={(e)=>setY1(e.target.value)} className='wid2r hei2r txt-center'></input>
            </div>  
            <div className='hei2p2r l-hei2p2r mRight_05 mLeft_05'>到</div>
            <div className='mRight_05'>
                <input placeholder='X2' onChange={(e)=>setX2(e.target.value)} className='wid2r hei2r txt-center'></input>
            </div>
            <div className='mRight_05'>
                <input placeholder='Y2' onChange={(e)=>setY2(e.target.value)} className='wid2r hei2r txt-center'></input>
            </div>  
            <div className='mRight_05'>
                <input placeholder='競技場等級' onChange={(e)=>setJJCLV(e.target.value)} className='hei2r wid6r txt-center'></input>
            </div>
            <div className='mRight_05'>
                <input placeholder='地圖大小預設為401' onChange={(e)=>setDistance(e.target.value)} className='hei2r wid8r txt-center'></input>
            </div>
            <div className='mRight_05'>
                <input placeholder='神器加成，預設一倍' onChange={(e)=>setArti(e.target.value)} className='hei2r wid8r txt-center'></input>
            </div>
            <div>   
                <div className='mRight_05 troopsCalCulator hei2r l-hei2r border1S00003 pTop_01 pRight_1 pBot_01 pLeft_1 borderRadius05r wid4r txt-center' onClick={()=>circularDistance(x1,y1,x2,y2,distance,setResult)}>計算</div>
            </div>
            <div className='flex wid15'>
                <div className='hei2p2r l-hei2p2r wid40 txt-center'>距離為</div>
                <div className='hei2r l-hei2r mLeft_03 wid40 pTop_01 pRight_03 pBot_01 pLeft_03 txt-center border1Sgray'>{String(result).substring(0,7)}</div>
            </div>
            <div className='wid60'>
                <div className='flex'>
                    <div className='wid10 txt-center hei2r l-hei2r borderTop1S00003 borderRight1S00003 borderBottom1S00003 borderLeft1S00003'>兵種速度</div>
                    <div className='wid20 txt-center hei2r l-hei2r borderTop1S00003 borderRight1S00003 borderBottom1S00003 '>行軍所需時間</div> 
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>3</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,3,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>4</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,4,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>5</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,5,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>6</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,6,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>7</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,7,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>8</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,8,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>9</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,9,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>10</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,10,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>11</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,11,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>12</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,12,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>13</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,13,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>14</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,14,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>15</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,15,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>16</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,16,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>17</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,17,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>18</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,18,JJCLV,arti):null}</div>
                </div>
                <div className='flex'>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 borderLeft1S00003 wid10'>19</div>
                    <div className='txt-center borderRight1S00003 borderBottom1S00003 wid20'>{result>0?TimeCalculate(result,19,JJCLV,arti):null}</div>
                </div>
            </div>
        </div>
        
       
        
        
    </div>
  )
}

export default DistanceCalculate
