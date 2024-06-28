import React,{useState} from 'react';
import Navbar from './Navbar';
import { Radio } from 'antd';

function FarmOasis() {  
  const [pickRace  , setPickRace ] = useState(null)
  const [showRuleNumber  ,setShowRuleNumber ] = useState(0)
  const RadioGroup = Radio.Group;

 function onRadioChange(e) {
    setPickRace(e.target.value)
  }
function renderRule1(){
  return (
    <div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'>圖示</div><div className='wid100px txt-center outline1S00003'>動物名稱</div><div  className='wid200px txt-center outline1S00003'>重生時間(分鐘)</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal1'/></div><div className='wid100px txt-center outline1S00003'>老鼠</div><div className='wid200px txt-center outline1S00003'>5</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal2'/></div><div className='wid100px txt-center outline1S00003'>蜘蛛</div><div className='wid200px txt-center outline1S00003'>6</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal3'/></div><div className='wid100px txt-center outline1S00003'>毒蛇</div><div className='wid200px txt-center outline1S00003'>7</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal4'/></div><div className='wid100px txt-center outline1S00003'>蝙蝠</div><div className='wid200px txt-center outline1S00003'>8</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal5'/></div><div className='wid100px txt-center outline1S00003'>野豬</div><div className='wid200px txt-center outline1S00003'>9</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal6'/></div><div className='wid100px txt-center outline1S00003'>野狼</div><div className='wid200px txt-center outline1S00003'>10</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal7'/></div><div className='wid100px txt-center outline1S00003'>灰熊</div><div className='wid200px txt-center outline1S00003'>11</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal8'/></div><div className='wid100px txt-center outline1S00003'>鱷魚</div><div className='wid200px txt-center outline1S00003'>12</div></div>
    <div className='flex'><div className='wid50px txt-center outline1S00003'><img alt='' className='hei16px wid16px animal animal9'/></div><div className='wid100px txt-center outline1S00003'>老虎</div><div className='wid200px txt-center outline1S00003'>13</div></div>
    </div>
  )
}
function renderRule2(){
  return (
    <div>
        <div>
            首先是觸發綠洲開始生動物的點有三個
            <div className="">
                <span>第一個 附近有村莊 人口產生變化了</span>
                <span>通常是指人口增長</span>
            </div>
            <div>
                <span> 第二個 該點路上有成立的攻擊波</span>
                <span>
                    {" "}
                    意思是你發出後90秒內取消，攻擊波不成立則不會觸發生怪
                </span>
            </div>
            <div>
                <span>第三個 伺服器系統自動生怪。</span>
            </div>
        </div>
        <div>
            <div>
                接下來開始說明的是觸發動物生成以後，動物生成的機制
            </div>
            <div>
                {" "}
                當觸發生怪以後，他一定會從時間最短的老鼠，開始判斷兩個問題
            </div>
            <div> 問題一 要不要生老鼠 ? </div>
            <div> 不要</div>
            <div>換判斷下一種動物(蜘蛛)要不要生成 。</div>

            <div> 若問題一成立(要生) 則才會產生問題二，要生幾隻? </div>
            <div>生完繼續判斷下一種動物(蜘蛛)要不要生成。</div>

            <div>以下舉例</div>
            <div> 時間是下午13:00整，當綠洲觸發生怪後---</div>
            <div> 系統開始判斷</div>
            <div className="flex">
                <div> 順序一:</div>{" "}
                <div>要不要生老鼠? 假設系統判定結果是 要</div>
            </div>
            <div className="flex">
                <div> 順序一:</div>{" "}
                <div>要不要生老鼠? 假設系統判定結果是 要</div>
            </div>
            <div className="flex">
                <div> 順序二:</div>{" "}
                <div>要生幾隻老鼠? 假設系統判定結果是 生5隻</div>
            </div>
            <div className="flex">
                <div> 順序三:</div> <div>接下來的時間</div>
                <div> 13:05會產出第一隻老鼠，</div>
                <div>13:10會產出第二隻老鼠，</div>
                <div>13:15會產出第三隻老鼠，</div>
                <div>
                    {" "}
                    13:20會產出第四隻老鼠。 這時候老鼠的生成排程已完結。
                </div>
            </div>
            <div className="flex">
                <div> 順序四:</div>{" "}
                <div>
                    13:20生完老鼠的瞬間，系統馬上繼續判斷要不要生蜘蛛?
                    假設系統判定結果是 不要
                </div>
            </div>
            <div className="flex">
                <div> 順序五:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生毒蛇? 假設系統判定結果是 不要
                </div>
            </div>
            <div className="flex">
                <div> 順序六:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生蝙蝠? 假設系統判定結果是 不要
                </div>
            </div>
            <div className="flex">
                <div> 順序七:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生野豬? 假設系統判定結果是 要
                </div>
            </div>
            <div className="flex">
                <div> 順序八:</div>{" "}
                <div>
                    系統接著判斷 要生幾隻野豬? 假設系統判定結果是 3隻
                </div>
            </div>
            <div className="flex">
                <div> 順序九:</div> <div>接下來的時間</div>
                <div>
                    {" "}
                    13:29 會產出第一隻野豬 (如果綠洲怪都沒被清
                    這時候會有4隻老鼠+1隻野豬了)
                </div>
                <div>13:38 會產出第二隻野豬</div>
                <div>
                    13:47 會產出第三隻野豬，這時候野豬的生成排程已完結。
                </div>
            </div>
            <div className="flex">
                <div> 順序十:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生野狼? 假設系統判定結果是 不要
                </div>
            </div>
            <div className="flex">
                <div> 順序十一:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生灰熊? 假設系統判定結果是 不要
                </div>
            </div>
            <div className="flex">
                <div> 順序十二:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生鱷魚? 假設系統判定結果是 不要
                </div>
            </div>
            <div className="flex">
                <div> 順序十三:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生老虎? 假設系統判定結果是 不要
                </div>
            </div>
            <div className="flex">
                <div> 順序十四:</div>{" "}
                <div>
                    馬上繼續判斷，要不要生大象? 假設系統判定結果是 不要
                </div>
            </div>
            <div>此時，這一次的生怪循環 就到此告一個段落了。</div>

            <div>我們可以得出幾個結論</div>
            <div className="flex">
                <div>1.</div>
                <div>
                    <div>
                        我們平常可能在特定種類綠洲特別容易看到某些動物
                    </div>
                    <div>
                        例如泥的鼠蛛豬，木的豬狼熊，鐵的鼠蜘蝠等等
                    </div>
                    <div>
                        實際上這些只是"常見"動物，任何一種動物
                        在任何一種綠洲裡都是有機會生成的。
                    </div>
                    <div>
                        只是判斷生成的機率不同而已，之所以常見是因為他們在該綠洲的生成機率相對比較高。
                    </div>
                </div>
            </div>

            <div className="flex">
                <div>2.</div>
                <div>
                    <div>
                        綠洲就像只有一個兵營的村莊，一次只能生成一種動物，也只能生成一隻，
                    </div>
                    <div>生成時間要多久則取決於是何種動物。</div>
                </div>
            </div>
            <div className="flex">
                <div>3.</div>
                <div>
                    <div>
                        一次生怪循環一定是從左到右判斷，生不生成&生成幾隻，
                    </div>
                    <div>
                        意思是一定是從老鼠生不生開始判斷，最後結尾是大象生不生，絕不會回頭判斷。
                    </div>
                    <div>
                        所以如果正在綠洲正在出野豬，出一出開始出熊了，則可以知道
                        野狼的生成被系統跳過了。
                    </div>
                    <div>
                        當熊出完的時候，只有可能繼續生成鱷魚/老虎/大象/其中一種，
                    </div>
                    <div>
                        倘若你發現這一個綠洲居然又開始生野豬了，那表示它已經開始下一次生怪循環了，等等生完野豬很有可能會繼續生野狼跟灰熊了恭喜。
                    </div>
                </div>
            </div>
            <div className="flex">
                <div>4.</div>
                <div>
                    <div>
                        因為每一次生怪循環的結尾都一定會判斷大象生不生
                    </div>
                    <div>
                        所以簡單來說
                        當你發現當下一直有在刷到動物，資源一直跳
                        很爽，一堆綠洲都在瘋狂出怪的時候--------
                    </div>
                    <div>
                        {" "}
                        等等，再等等，很有可能會有很多綠洲一起出大象了。
                    </div>
                </div>
            </div>
        </div>
    </div>
);
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

  default:
    return(
      <div>null</div>
    )
;
  }
}
function  handle4logicButtonOnClick(number){
  console.log('in handle4logicButtonOnClick number',number)
  if(number===showRuleNumber){
    setShowRuleNumber(0)
  }else{
    setShowRuleNumber(number)
  }
}
    return (
      <div className='mLeft_1'>
        <Navbar/>
        <div>刷綠教學</div>
        <div>總共分成四個環節，四個環節都非常重要，請要刷綠之前務必知悉每一個細節，以免刷綠時候操作失誤，造成事倍功半。</div>

        <div>核心邏輯:</div>
        <div>透過不同兵種各<span className='color_cf2321'>1隻</span> 湊出 <span className='color_cf2321'>總和攻擊力</span>超過當前綠洲怪之<span  className='color_cf2321'>防禦力總和</span>即可達成無損刷怪</div>
        
        <div>注意:</div>
        <div>由於大象戰鬥力過高，導致遇到大象時要把大象直接擊殺的成本過高 <span>因此無損刷綠是指遇到大象以外的綠洲動物都可以清掉</span></div>

        <div className='flex mTop_1'>
        <div className='hei20px wid20px mRight_05 mBot_1 border1Sblack no1' onClick={()=>handle4logicButtonOnClick(1)}><div className={`${showRuleNumber===1?'onSelect':null}`}></div></div>  <div>生怪頻率</div>
        <div className='hei20px wid20px mRight_05 mBot_1 border1Sblack no2' onClick={()=>handle4logicButtonOnClick(2)}><div className={`${showRuleNumber===2?'onSelect':null}`}></div></div>  <div>生怪邏輯</div>
        </div>
        {showRuleNumber===1?renderRule1():null}
        {showRuleNumber===2?renderRule2():null}
        {/*
          <div>
          <RadioGroup onChange={(e)=>onRadioChange(e)} >
            <Radio key="1" value={1} checked={pickRace}>條頓</Radio>
            <Radio key="2" value={2} checked={pickRace}>羅馬</Radio>
            <Radio key="3" value={3} checked={pickRace}>高盧</Radio>
            <Radio key="4" value={4} checked={pickRace}>匈奴</Radio>
            <Radio key="5" value={5} checked={pickRace}>埃及</Radio>
          </RadioGroup>
        </div>
        */}
        {pickRace?showDetail():null}
      </div>
   
    );
  }
  
  export default FarmOasis;