function circulateDistance(x1, y1, x2, y2, size, setResult) {
  // 計算x軸和y軸的差值，並考慮跨越邊界的距離
  let dx = Math.min(Math.abs(x2 - x1), size - Math.abs(x2 - x1));
  let dy = Math.min(Math.abs(y2 - y1), size - Math.abs(y2 - y1));

  // 計算直線距離
  return Math.sqrt(dx * dx + dy * dy);
}
export default circulateDistance;
