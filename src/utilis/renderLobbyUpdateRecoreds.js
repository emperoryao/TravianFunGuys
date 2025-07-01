import "../style/common.less";
import { Timeline } from "antd";
export default function renderUpdateRecord(params) {
  return (
    <div className={params}>
      <Timeline>
        <Timeline.Item>新增 老三族軍隊MetaData 2025-07-01</Timeline.Item>
        <Timeline.Item>
          新增 行軍計算器英雄左手裝備計算公式 2025-07-01
        </Timeline.Item>
        <Timeline.Item>優化 刷綠與建築資源計算頁面 於 2025-06-30</Timeline.Item>
        <Timeline.Item>新增 手機板大廳 於 2025-06-30</Timeline.Item>
        <Timeline.Item>
          調整 建築資源計算器統計清單不論加入先後都會依照等級排序 於 2024-07-17
        </Timeline.Item>
        <Timeline.Item>
          新增 建築資源計算器新增(複選等級功能) 於 2024-07-16
        </Timeline.Item>
        <Timeline.Item>
          新增 行軍計算器功能項(靴子選項) 於 2024-07-15
        </Timeline.Item>
        <Timeline.Item>
          新增 行軍計算器功能項(神器選項) 於 2024-07-11
        </Timeline.Item>
        <Timeline.Item>
          新增 行軍計算器基礎功能 (含競技場功能) 於 2024-07-10
        </Timeline.Item>
        <Timeline.Item>
          新增 文明點頁面相關資訊整理中 於 2024-07-04
        </Timeline.Item>
        <Timeline.Item>調整 建築資源列表 於 2024-07-04</Timeline.Item>
        <Timeline.Item>調整 導覽列版面 於 2024-07-04</Timeline.Item>
        <Timeline.Item>
          新增 建築資料列表-建築資源計算器於 2024-07-04
        </Timeline.Item>
        <Timeline.Item>
          調整 現在登入後會自動儲存登入資訊 於 2024-07-03
        </Timeline.Item>
        <Timeline.Item>
          修復 導航列點擊回到首頁需要重新登入bug於 2024-07-03
        </Timeline.Item>
        <Timeline.Item>新增 刷綠教學-種族配置區塊於 2024-07-01</Timeline.Item>
        <Timeline.Item>新增 綠洲資料於 2024-06-28</Timeline.Item>
        <Timeline.Item>頁面始於 2024-06-27</Timeline.Item>
      </Timeline>
    </div>
  );
}
