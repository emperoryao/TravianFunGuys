import "../style/common.less";
import updateRecords from "../config/updateRecords";
import { Timeline } from "antd";
import "../style/common.less";

export default function renderUpdateRecord(params) {
  const timelineItems = updateRecords.map((item) => {
    let prefix = null;

    if (item.type === "mobile") {
      prefix = <span className="newReleaseMobile">新增</span>;
    } else if (item.type === "desktop") {
      prefix = <span className="newReleaseDeskTop">新增</span>;
    }

    return {
      children: (
        <>
          {prefix} {item.text} {item.date}
        </>
      ),
    };
  });

  return (
    <div className={params}>
      <Timeline items={timelineItems} />
    </div>
  );
}
