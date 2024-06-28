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
    <div className='pAll_20px border1S00003'>
        <div className=''>
            <div className='fs20px fw-bold'>觸發綠洲開始生動物的點有三個</div>
            
            <div className="">
                <span className='fw-bold'>第一個</span>
                <span className='mLeft_05'>附近有村莊 人口產生變化了</span>

                <span className='color_cf2321'>通常是指人口增長</span>
            </div>
            <div>
                <span className='fw-bold'>第二個</span>
                <sapn className='mLeft_05'>該點路上有成立的攻擊波</sapn>
                <span>
                    意思是你發出後90秒內取消，攻擊波不成立則不會觸發生怪
                </span>
            </div>
            <div>
                <span className='fw-bold'>第三個</span>
                <span className='mLeft_05'>伺服器系統自動生怪</span>
            </div>
        </div>
        <div className='mTop_1 mBot_1 borderTop1S383838 '></div>
        <div className=''>
            <div className='fs20px fw-bold'>
                接下來開始說明的是觸發動物生成以後，動物生成的機制
            </div>
            <div>
                當觸發生怪以後，他一定會從時間最短的<span className='color_06730B'>老鼠</span>，開始判斷兩個問題
            </div>
            <div className='fw-bold'>問題一</div>
            <div className=''><span className='color_030095'>要不要生</span><span className='color_06730B'>老鼠</span> ?</div>
            <div className='color_cf2321'> 不要</div>
            <div>換判斷下一種動物(<span className='color_045affe8'>蜘蛛</span>)要不要生成 。</div>

            <div className='mTop_05'> 若問題一成立(系統判定要生<span className='color_06730B'>老鼠</span>) </div>
            <div  className='fw-bold'>產生問題二 </div>
            <div className='color_030095'>要生幾隻<span className='color_06730B'>老鼠</span>?</div>


            <div>決定生幾隻同時生完以後，繼續判斷下一種動物(<span className='color_045affe8'>蜘蛛</span>)要不要生成。</div>
            <div className='mTop_1 mBot_1 borderTop1S383838'></div>
            <div className=''>以下舉例</div>
            <div> 時間是下午 <span className='color_cf2321 fw-bold'>13:00整</span>當綠洲觸發生怪後---</div>
            <div> 系統開始判斷</div>

            <div className="flex">
                <div className='fw-bold'>順序一:</div>
                <div className='mLeft_05'><span className='color_030095'>要不要生</span><span className='color_06730B'>老鼠</span>? 假設系統判定結果是 <span className='color_purple fw-bold'>要 </span></div>
            </div>

            <div className="flex mTop_05">
                <div className='fw-bold'> 順序二:</div>
                <div className='mLeft_05'><span className='color_030095'>要生幾隻</span><span className='color_06730B'>老鼠</span>? 假設系統判定結果是 生5隻</div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序三:</div> 
                <div className='mLeft_05'>
                <div >接下來的時間</div>
                <div>13:05會產出第<span className='color_ed1c00 fw-bold'>1</span>隻<span className='color_06730B'>老鼠</span></div>
                <div>13:10會產出第<span className='color_ed1c00 fw-bold'>2</span>隻<span className='color_06730B'>老鼠</span></div>
                <div>13:15會產出第<span className='color_ed1c00 fw-bold'>3</span>隻<span className='color_06730B'>老鼠</span></div>
                <div>13:20會產出第<span className='color_ed1c00 fw-bold'>4</span>隻<span className='color_06730B'>老鼠</span></div>
                <div>這時候<span className='color_06730B'>老鼠</span>的生成排程已完結。</div>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序四:</div>
                <div className='mLeft_05'>
                    13:20生完<span className='color_06730B'>老鼠</span>的瞬間，系統馬上繼續判斷<span className='color_030095'>要不要生</span><span className='color_045affe8'>蜘蛛</span>?
                    假設系統判定結果是 <span className='color_ed1c00 fw-bold'>不要 </span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序五:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_34e50a'>毒蛇</span>? 假設系統判定結果是 <span className='color_cf2321 fw-bold'>不要</span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序六:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_673211'>蝙蝠</span>? 假設系統判定結果是 <span className='color_cf2321 fw-bold'>不要</span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序七:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_4d10ff'>野豬</span>? 假設系統判定結果是 <span className='color_purple fw-bold'>要 </span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序八:</div>
                <div className='mLeft_05'>
                    系統接著判斷 <span className='color_030095'>要生幾隻</span><span className='color_4d10ff'>野豬</span>? 假設系統判定結果是 3隻
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序九:</div> 
                <div className='mLeft_05'>
                  <div>接下來的時間</div>
                  <div>13:29 會產出第<span className='color_ed1c00 fw-bold'>1</span>隻<span className='color_4d10ff'>野豬</span></div>
                  <div> 如果綠洲怪都沒被清，這時候會有4隻<span className='color_06730B'>老鼠</span>+1隻<span className='color_4d10ff'>野豬</span>了</div>

                  <div className='mTop_03'>13:38 會產出第<span className='color_ed1c00 fw-bold'>2</span>隻<span className='color_4d10ff'>野豬</span></div>
                  <div>13:47 會產出第<span className='color_ed1c00 fw-bold'>3</span>隻<span className='color_4d10ff'>野豬</span></div>
                  <div>這時候<span className='color_4d10ff'>野豬</span>的生成排程已完結。</div>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序十:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_ff00ba'>野狼</span>? 假設系統判定結果是 <span className='color_cf2321 fw-bold'>不要</span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序十一:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_gray'>灰熊</span>? 假設系統判定結果是 <span className='color_cf2321 fw-bold'>不要</span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序十二:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_orange'>鱷魚</span>? 假設系統判定結果是 <span className='color_cf2321 fw-bold'>不要</span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序十三:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_1f8f13'>老虎</span>? 假設系統判定結果是 <span className='color_cf2321 fw-bold'>不要</span>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'> 順序十四:</div>
                <div className='mLeft_05'>
                    馬上繼續判斷，<span className='color_030095'>要不要生</span><span className='color_0b76ff'>大象</span>? 假設系統判定結果是 <span className='color_cf2321 fw-bold'>不要</span>
                </div>
            </div>
            <div className=' mTop_05'>到這一步，這一次的生怪循環 就到此告一個段落了。</div>
            <div className='mTop_1 mBot_1 borderTop1S383838 '></div>
            <div className='fs20px fw-bold'>我們可以得出幾個結論</div>
            <div className="flex mTop_05">
                <div className='fw-bold'>1.</div>
                <div className='mLeft_05'>
                    <div>
                        我們平常可能在特定種類綠洲特別容易看到某些動物
                    </div>
                    <div>
                        例如泥的鼠蛛豬，木的豬狼熊，鐵的鼠蜘蝠等等
                    </div>
                    <div> 實際上這些只是"常見"動物</div>
                    <div className='color_cf2321'>任何一種動物在任何一種綠洲裡都是有機會生成的。</div>
                    <div>
                        只是判斷生成的機率不同而已，之所以常見是因為他們在該綠洲的生成機率相對比較高。
                    </div>
                </div>
            </div>

            <div className="flex mTop_05">
                <div className='fw-bold'>2.</div>
                <div className='mLeft_05'>
                    <div>
                        綠洲就像只有一個兵營的村莊，一次只能生成一種動物，也只能生成一隻，
                    </div>
                    <div>生成時間要多久則取決於是何種動物。</div>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'>3.</div>
                <div className='mLeft_05'>
                    <div>
                        一次生怪循環一定是<span className='color_cf2321'>從左到右判斷</span>，生不生成&生成幾隻，
                    </div>
                    <div>
                        意思是一定是從<span className='color_06730B'>老鼠</span>生不生開始判斷，最後結尾是<span className='color_0b76ff'>大象</span>生不生，絕不會回頭判斷。
                    </div>
                    <div>
                        所以如果正在綠洲正在出<span className='color_4d10ff'>野豬</span>，出一出開始出<span className='color_gray'>灰熊</span>了，則可以知道
                        <span className='color_ff00ba'>野狼</span>的生成被系統跳過了。
                    </div>
                    <div>
                        當<span className='color_gray'>灰熊</span>出完的時候，只有可能繼續生成<span className='color_orange'>鱷魚</span>/<span className='color_1f8f13'>老虎</span>/<span className='color_0b76ff'>大象</span>/其中一種，
                    </div>
                    <div>
                        倘若你發現這一個綠洲居然又開始生<span className='color_4d10ff'>野豬</span>了，那表示它已經開始<span className='color_cf2321'>下一次生怪循環</span>，等等生完<span className='color_4d10ff'>野豬</span>很有可能會繼續生<span className='color_ff00ba'>野狼</span>跟<span className='color_gray'>灰熊</span>了恭喜。
                    </div>
                </div>
            </div>
            <div className="flex mTop_05">
                <div className='fw-bold'>4.</div>
                <div className='mLeft_05'>
                    <div>
                        因為每一次生怪循環的結尾都一定會判斷<span className='color_0b76ff'>大象</span>生不生
                    </div>
                    <div>
                        所以簡單來說
                        當你發現當下一直有在刷到動物，資源一直跳
                        很爽，一堆綠洲都在瘋狂出怪的時候--------
                    </div>
                    <div>
                        等等，再等等，很有可能會有很多綠洲一起出<span className='color_0b76ff'>大象</span>了。
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}
function renderRule3(){
  return <div>開發中</div>
}
function renderRule4(){
  return <div>開發中2</div>
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
        <div>由於<span className='color_0b76ff'>大象</span>戰鬥力過高，導致遇到<span className='color_0b76ff'>大象</span>時要把<span className='color_0b76ff'>大象</span>直接擊殺的成本過高 <span>因此無損刷綠是指遇到<span className='color_0b76ff'>大象</span>以外的綠洲動物都可以清掉</span></div>

        <div className='flex mTop_1'>
        <div className='hei20px wid20px mRight_05 mBot_1 border1Sblack no1' onClick={()=>handle4logicButtonOnClick(1)}><div className={`${showRuleNumber===1?'onSelect':null}`}></div></div>  <div>生怪頻率</div>
        <div className='hei20px wid20px mRight_05 mBot_1 border1Sblack no2' onClick={()=>handle4logicButtonOnClick(2)}><div className={`${showRuleNumber===2?'onSelect':null}`}></div></div>  <div>生怪邏輯</div>
        <div className='hei20px wid20px mRight_05 mBot_1 border1Sblack no1' onClick={()=>handle4logicButtonOnClick(3)}><div className={`${showRuleNumber===3?'onSelect':null}`}></div></div>  <div>清怪邏輯</div>
        <div className='hei20px wid20px mRight_05 mBot_1 border1Sblack no2' onClick={()=>handle4logicButtonOnClick(4)}><div className={`${showRuleNumber===4?'onSelect':null}`}></div></div>  <div>種族配置</div>
        </div>
        {showRuleNumber===1?renderRule1():null}
        {showRuleNumber===2?renderRule2():null}
        {showRuleNumber===3?renderRule3():null}
        {showRuleNumber===4?renderRule4():null}
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