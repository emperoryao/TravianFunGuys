import { Toast } from "antd-mobile";
function circulateDistance(x1, y1, x2, y2, size, setResult) {
  console.log("circulateDistance x1, y1, x2, y2, size", x1, y1, x2, y2, size);
  console.log("size", size);
  if (x1 === undefined || x1 === null || x1 === "") {
    Toast.show({ content: "請輸入 X1 座標", duration: 1000 });
    return;
  }
  if (y1 === undefined || y1 === null || y1 === "") {
    Toast.show({ content: "請輸入 Y1 座標", duration: 1000 });
    return;
  }
  if (x2 === undefined || x2 === null || x2 === "") {
    Toast.show({ content: "請輸入 X2 座標", duration: 1000 });
    return;
  }
  if (y2 === undefined || y2 === null || y2 === "") {
    Toast.show({ content: "請輸入 Y2 座標", duration: 1000 });
    return;
  }

  const max = Math.floor(size / 2); // 最大可接受範圍（例如 size=501，max=250）

  const isOutOfBounds = (value) => value > max || value < -max;

  if (
    isOutOfBounds(x1) ||
    isOutOfBounds(y1) ||
    isOutOfBounds(x2) ||
    isOutOfBounds(y2)
  ) {
    Toast.show({ content: `當前座標超過 ±${max}（地圖邊界)`, duration: 1000 });
    return;
  }
  // 計算x軸和y軸的差值，並考慮跨越邊界的距離
  let dx = Math.min(Math.abs(x2 - x1), size - Math.abs(x2 - x1));
  let dy = Math.min(Math.abs(y2 - y1), size - Math.abs(y2 - y1));

  // 計算直線距離
  return Math.sqrt(dx * dx + dy * dy);
}
export default circulateDistance;
