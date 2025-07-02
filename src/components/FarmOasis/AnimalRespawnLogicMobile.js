function AnimalRespawnLogicMobile() {
  return (
    <div className="mLeft_1 wid92 pBot_25">
      <div className="fs1p2r fw-bold FarmOasisMobileTitle">
        已知的綠洲觸發生怪時間點
      </div>
      <div className="fs09r">
        <div>．附近有村莊人口產生增長</div>
        <div>．該綠洲有新增攻擊波(包含偵查)</div>
        <div>．伺服器系統自動生怪</div>
      </div>
      <br />
      <div className="fs1p2r fw-bold FarmOasisMobileTitle">
        觸發以後的動物生成機制
      </div>
      <div className="fs09r mLeft_05">
        <div>從生成時間最短的老鼠，開始判斷</div>
        <div className="">
          ．進入問題二問題一 要不要生 <span className="color_06730B">老鼠</span>
        </div>
        <div>
          <span className="color_cf2321"> 不要</span>
          <span>
            則換判斷下一種動物(<span className="color_045affe8">蜘蛛</span>
            )要不要生成
          </span>
        </div>
        <div className="mTop_05">
          若問題一系統判定要生<span className="color_06730B">老鼠</span>
        </div>
        <div>
          ．進入問題二: 要生幾隻<span className="color_06730B">老鼠</span>?
        </div>
        <div className="mTop_05">問題二判斷完並生完以後</div>
        <div>換成下一種動物，進入上述循環</div>
      </div>
      <br />
      <div className="fs1p2r fw-bold FarmOasisMobileTitle">結論</div>

      <div className="fs09r mLeft_05">
        <div>特定種類綠洲常見特定種類動物</div>
        <div>例如</div>
        <div>泥-鼠蛛豬</div>
        <div>木-豬狼熊</div>
        <div>鐵-鼠蜘蝠</div>
        <div> 實際上只是"常見"動物</div>
        <div className="color_cf2321">任一種動物在任一種綠洲裡都有機會生成</div>
        <div>常見僅是因為牠們在該種類綠洲生成機率比較高</div>
      </div>
      <br />
      <div className="hei1r l-hei1r borderTop1Sgray"></div>
      <div className="fs09r mLeft_05">
        <div>綠洲像是只有一個兵營的村莊</div>
        <div>一次只能生成一種動物，也只能生成一隻</div>
        <div>生成時間取決於生成何種動物</div>
      </div>
      <br />
      <div className="hei1r l-hei1r borderTop1Sgray"></div>
      <div className="fs09r mLeft_05 ">
        <div>
          每一次生怪循環皆
          <span className="color_cf2321">從左到右依序判斷</span>
        </div>
        <div> 生成與否及生成幾隻</div>
        <div>
          即判斷一定始於<span className="color_06730B">老鼠</span>
          終於
          <span className="color_0b76ff">大象</span>
        </div>
        <br />
        <div>
          假設綠洲原先在生成<span className="color_4d10ff">野豬</span> 接著生成
          <span className="color_gray">灰熊</span>
        </div>
        <div>
          即可知<span className="color_ff00ba">野狼</span>被系統跳過了
        </div>
        <br />
        <div>
          當<span className="color_gray">灰熊</span>生成完時
        </div>
        <div>
          有可能接著生成
          <span className="color_orange">鱷魚</span>/
          <span className="color_1f8f13">老虎</span>/
          <span className="color_0b76ff">大象</span>其一或結束生怪循環
        </div>
        <br />
        <div>
          倘若發現同一綠洲又開始生成 <span className="color_4d10ff">野豬</span>
        </div>
        <div>
          表示已開始
          <span className="color_cf2321">下一次生怪循環</span>
        </div>
        <br />
      </div>

      <div className="mLeft_05">
        <div>
          每一次生怪循環結尾都一定是判斷
          <span className="color_0b76ff">大象</span>
        </div>
        <div>發現當下一直有在綠洲刷到動物時</div>
        <div>
          等等可能會有很多綠洲一起出
          <span className="color_0b76ff">大象</span>
        </div>
      </div>
    </div>
  );
}
export default AnimalRespawnLogicMobile;
