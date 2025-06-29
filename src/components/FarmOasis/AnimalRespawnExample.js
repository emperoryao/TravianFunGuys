function AnimalRespawnExample() {
  return (
    <div className="mLeft_1">
      <div className="">以下舉例</div>
      <div>
        假設下午 <span className="color_cf2321 fw-bold">13:00整</span>
        綠洲觸發生怪
      </div>
      <div> 系統開始判斷</div>
      <div className="flex">
        <div className="fw-bold">順序一:</div>
        <div className="mLeft_05">
          <span className="color_030095">生</span>
          <span className="color_06730B">老鼠</span>? 假設判定
          <span className="color_purple fw-bold">要 </span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序二:</div>
        <div className="mLeft_05">
          <span className="color_030095">生幾隻</span>
          <span className="color_06730B">老鼠</span>? 假設判定 生4隻
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序三:</div>
        <div className="mLeft_05">
          <div>
            13:05會產出第<span className="color_ed1c00 fw-bold">1</span>隻
            <span className="color_06730B">老鼠</span>
          </div>
          <div>
            13:10會產出第<span className="color_ed1c00 fw-bold">2</span>隻
            <span className="color_06730B">老鼠</span>
          </div>
          <div>
            13:15會產出第<span className="color_ed1c00 fw-bold">3</span>隻
            <span className="color_06730B">老鼠</span>
          </div>
          <div>
            13:20會產出第<span className="color_ed1c00 fw-bold">4</span>隻
            <span className="color_06730B">老鼠</span>
          </div>
          <div>
            <span className="color_06730B">老鼠</span>
            生成排程已完結。
          </div>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序四:</div>
        <div className="mLeft_05">
          13:20生完<span className="color_06730B">老鼠</span>
          的瞬間，系統接著判斷
          <span className="color_030095">生</span>
          <span className="color_045affe8">蜘蛛</span>? 假設判定
          <span className="color_ed1c00 fw-bold">不要 </span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序五:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_34e50a">毒蛇</span>? 假設判定
          <span className="color_cf2321 fw-bold">不要</span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序六:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_673211">蝙蝠</span>? 假設判定
          <span className="color_cf2321 fw-bold">不要</span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序七:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_4d10ff">野豬</span>? 假設判定
          <span className="color_purple fw-bold">要 </span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序八:</div>
        <div className="mLeft_05">
          接著判斷， <span className="color_030095">生</span>
          <span className="color_4d10ff">野豬</span>? 假設判定 生3隻 (
          野豬單隻生產時間為9分鐘 )
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序九:</div>
        <div className="mLeft_05">
          <div>
            13:29 會產出第<span className="color_ed1c00 fw-bold">1</span>隻
            <span className="color_4d10ff">野豬</span>
          </div>
          <div>
            如果綠洲怪都沒被清，這時候會有4隻
            <span className="color_06730B">老鼠</span>+1隻
            <span className="color_4d10ff">野豬</span>了
          </div>

          <div className="mTop_03">
            13:38 會產出第<span className="color_ed1c00 fw-bold">2</span>隻
            <span className="color_4d10ff">野豬</span>
          </div>
          <div>
            13:47 會產出第<span className="color_ed1c00 fw-bold">3</span>隻
            <span className="color_4d10ff">野豬</span>
          </div>
          <div>
            <span className="color_4d10ff">野豬</span>
            生成排程已完結。
          </div>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序十:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_ff00ba">野狼</span>? 假設判定
          <span className="color_cf2321 fw-bold">不要</span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序十一:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_gray">灰熊</span>?假設判定
          <span className="color_cf2321 fw-bold">不要</span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序十二:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_orange">鱷魚</span>? 假設判定
          <span className="color_cf2321 fw-bold">不要</span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序十三:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_1f8f13">老虎</span>? 假設判定
          <span className="color_cf2321 fw-bold">不要</span>
        </div>
      </div>
      <div className="flex mTop_05">
        <div className="fw-bold"> 順序十四:</div>
        <div className="mLeft_05">
          接著判斷，<span className="color_030095">生</span>
          <span className="color_0b76ff">大象</span>? 假設判定
          <span className="color_cf2321 fw-bold">不要</span>
        </div>
      </div>
      <div className=" mTop_05">到這此次生怪循環告一段落</div>
    </div>
  );
}
export default AnimalRespawnExample;
