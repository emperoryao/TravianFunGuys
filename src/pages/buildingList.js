import React, { useState } from 'react';
import Navbar from './Navbar';
import resourcesList from './dataFile/ResourceRecord/resourcesList'
import '../style/common.less'

function renderTotalResources(calculator,setCalculator,saveArray,setSaveArray,totalResourceArray,setTotalResourceArray){
  let resultArray=[]
  for(let i in saveArray){
    let key =Object.keys(saveArray[i])[0]
    console.log('統計的目標key',key)
    let value=Object.values(saveArray[i])[0]
    console.log('統計的目標等級',value)
    let targetList=resourcesList[0][key]
    let target=targetList.find(a=>a.lv==value)
    console.log('統計的資源清單',target)
    resultArray.push(target)
  }
  let totalWood=0
  let totalBrick=0
  let totalIron=0
  let totalCorp=0
  let totalTotal=0
  for (let j in resultArray){
    totalWood+=resultArray[j].wood
    totalBrick+=resultArray[j].brick
    totalIron+=resultArray[j].iron
    totalCorp+=resultArray[j].corp
    totalTotal+=resultArray[j].totol
  }
  return (
    <div className='flex'>
        <div className='wid35 txt-center border1S7E7E7E'>總和</div>
        <div className='wid8 txt-center border1S7E7E7E'>{totalWood}</div>
        <div className='wid8 txt-center border1S7E7E7E'>{totalBrick}</div>
        <div className='wid8 txt-center border1S7E7E7E'>{totalIron}</div>
        <div className='wid8 txt-center border1S7E7E7E'>{totalCorp}</div>
        <div className='wid8 txt-center border1S7E7E7E'>{totalTotal}</div>
      </div>
  )
}

function currentPickTargets(calculator,setCalculator,saveArray,setSaveArray,totalResourceArray,setTotalResourceArray){
  return( 
    <div> 
      <div><span className='fs20px'>當前統計之建築清單</span> <span className='color_cf2321'>點擊不要的建築項目即可從清單中移除</span></div>
      <div className='flex'>
        <div className='wid35 txt-center border1S7E7E7E'>建築物</div>
        <div className='wid8 txt-center border1S7E7E7E'>木</div>
        <div className='wid8 txt-center border1S7E7E7E'>泥</div>
        <div className='wid8 txt-center border1S7E7E7E'>鐵</div>
        <div className='wid8 txt-center border1S7E7E7E'>米</div>
        <div className='wid8 txt-center border1S7E7E7E'>總和</div>
      </div>
      <div>
        {saveArray.length>0&&saveArray.map((item,index)=>{
          let targetList=resourcesList[0][Object.keys(item)[0]]
          let target=targetList.find(a=>a.lv==Object.values(item))
          console.log('item in currentPickTargets',item)
          return (
            <div className='flex buildinginCalculator' key={index} onClick={()=>handleBuildLvOnClick(item,saveArray,setSaveArray)}>
              <div className='wid35 txt-center border1S7E7E7E'>{Object.keys(item)[0]} - 等級{Object.values(item)}</div>
              <div className='wid8 txt-center border1S7E7E7E'>{target.wood}</div>
              <div className='wid8 txt-center border1S7E7E7E'>{target.brick}</div>
              <div className='wid8 txt-center border1S7E7E7E'>{target.iron}</div>
              <div className='wid8 txt-center border1S7E7E7E'>{target.corp}</div>
              <div className='wid8 txt-center border1S7E7E7E'>{target.totol}</div>
            </div>
          )
        })}
      </div>
      <div className='flex mTop_05'>
        <div className='wid35 txt-center border1S7E7E7E'>
        </div>
        <div className='wid8 txt-center border1S7E7E7E'>木</div>
        <div className='wid8 txt-center border1S7E7E7E'>泥</div>
        <div className='wid8 txt-center border1S7E7E7E'>鐵</div>
        <div className='wid8 txt-center border1S7E7E7E'>米</div>
        <div className='wid8 txt-center border1S7E7E7E'>總和</div>
      </div>
        <div>{renderTotalResources(calculator,setCalculator,saveArray,setSaveArray,totalResourceArray,setTotalResourceArray)}</div>
  </div>)
}
function handleBuildLvOnClick(NewItem,saveArray,setSaveArray){ 
  let newKey=Object.keys(NewItem)[0]
  console.log('newKey in handleBuildLvOnClick',newKey)
  let newValue=Object.values(NewItem)[0]
  console.log('newValue in handleBuildLvOnClick',newValue)
  console.log('saveArray',saveArray)

  if(saveArray.length>0){
     let newItemkey=Object.keys(NewItem)
     console.log('看一下NewItem[newItemkey]',NewItem[newItemkey])
    const exist=saveArray.some(item=>item[newItemkey]===NewItem[newItemkey])
    console.log('exist',exist)
    if (exist) {
      const filteredArray = saveArray.filter(item => JSON.stringify(item) !== JSON.stringify(NewItem));
      setSaveArray(filteredArray)
    } else {
      console.log('新增項目')
      setSaveArray([...saveArray,NewItem])
    }
  }else{
    //console.log('saveArray原本為空')
    setSaveArray([...saveArray,NewItem])
  }
 

 
}


function renderCurrentBuilding(build,saveArray,setSaveArray){
  let data=resourcesList[0][build]
  return (
    <div className='mBot_5'>
      {data&&data.map(item=>{
        const{lv,wood,brick,iron,corp,totol,pop,whlv,gnlv,CP,ER,Prod}=item
        return (
        <div className='flex bulidingLevelList' onClick={()=>handleBuildLvOnClick({[build]:lv},saveArray,setSaveArray)}>
          <div key={lv} className='wid8 txt-center border1S7E7E7E'>{lv}</div>
          <div key={lv} className='wid8 txt-center border1S7E7E7E'>{wood}</div>
          <div key={lv} className='wid8 txt-center border1S7E7E7E'>{brick}</div>
          <div key={lv} className='wid8 txt-center border1S7E7E7E'>{iron}</div>
          <div key={lv} className='wid8 txt-center border1S7E7E7E'>{corp}</div>
          <div key={lv} className='wid8 txt-center border1S7E7E7E'>{totol}</div>
        </div>
      )
      })
        }
    </div>
  )
}
function BuildingList() {
  const [build,setBuild]=useState(null)
  const [calculator,setCalculator]=useState(null)
  const [saveArray,setSaveArray]=useState([])
  const [totalResourceArray,setTotalResourceArray]=useState([])
  let resources=Object.keys(resourcesList[0])
  let resources1=resources.slice(0,14)
  let resources2=resources.slice(14,32)
  let resources3=resources.slice(32)
  
  return (
    <div className='mLeft_1'>
      <Navbar/>
      <div  className='mLeft_1'>建築資源計算器</div>
      <div className='flex mLeft_1'>
        <div className='flex wid60'>
            <div className='wid20'>
              {resources1.map((item1,index1)=>{
                return( 
                      <div key={index1}>
                        <div onClick={()=>setBuild(item1)}>{item1}</div>
                      </div>
                      )
              })}
          </div>
          <div className='wid20'>
              {resources2.map((item2,index2)=>{
                return( 
                      <div key={index2}>
                        <div onClick={()=>setBuild(item2)}>{item2}</div>
                      </div>
                      )
              })}
          </div>
          <div className='wid20'>
              {resources3.map((item3,index3)=>{
                return( 
                      <div key={index3}>
                        <div onClick={()=>setBuild(item3)}>{item3}</div>
                      </div>
                      )
              })}
          </div>
        </div>
        <div className='wid50 mLeft_10p'>
          <div>
            {currentPickTargets(calculator,setCalculator,saveArray,setSaveArray,totalResourceArray,setTotalResourceArray)}
          </div>
        </div>
      </div>
      <div className='mTop_1 mLeft_1'>
        <div className='mBot_02 color_0600ff'>{build}</div>
        <div className='flex'>
          <div className='wid8 txt-center border1S7E7E7E'>等級</div>
          <div className='wid8 txt-center border1S7E7E7E'>木</div>
          <div className='wid8 txt-center border1S7E7E7E'>泥</div>
          <div className='wid8 txt-center border1S7E7E7E'>鐵</div>
          <div className='wid8 txt-center border1S7E7E7E'>米</div>
          <div className='wid8 txt-center border1S7E7E7E'>總和</div>
        </div>
        {renderCurrentBuilding(build,saveArray,setSaveArray)}
      </div>
  </div>
  );
}

export default BuildingList;