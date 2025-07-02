function calculateTime(
  totalDistance,
  speed,
  extraLevel = 0,
  timeMultiplier,
  shoeInfo,
  leftHandInfo,
  isReturn = false
) {
  let shoeValue = shoeInfo.value;
  let shoesBonus = 0;
  let bonusAfter20Grids = 0;

  if (typeof shoeValue === "number" && shoeValue !== 0) {
    shoesBonus = shoeValue;
  } else if (shoeValue !== 0) {
    const temp = parseInt(shoeValue.split("%")[0], 10);
    bonusAfter20Grids = (temp || 0) / 100;
  }

  const baseSpeed = (speed + shoesBonus) * timeMultiplier;
  const speedMultiplier = 1 + bonusAfter20Grids + extraLevel * 0.2;
  const acceleratedSpeed = baseSpeed * speedMultiplier;

  const initialDistance = Math.min(totalDistance, 20);
  const initialTime = initialDistance / baseSpeed;
  const remainingDistance = Math.max(0, totalDistance - 20);
  const remainingTime = remainingDistance / acceleratedSpeed;

  let totalTimeInHours = initialTime + remainingTime;
  let totalSeconds = Number((totalTimeInHours * 3600).toFixed(0));

  const isMap = leftHandInfo?.label.includes("地圖");

  // 加成處理：回程時套用地圖類裝備；去程則套用旗類裝備
  if ((isReturn && isMap) || (!isReturn && !isMap)) {
    totalSeconds /= 1 + 0.01 * leftHandInfo.bonus;
  }

  totalTimeInHours = totalSeconds / 3600;
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

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");
}
export default calculateTime;
