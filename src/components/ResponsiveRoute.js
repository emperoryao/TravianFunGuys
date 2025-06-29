// components/ResponsiveRoute.js
import React from "react";
import useDeviceType from "../hooks/useDeviceType";
function ResponsiveRoute({
  desktopComponent: Desktop,
  mobileComponent: Mobile,
}) {
  const device = useDeviceType();
  console.log("device", device);
  return device === "mobile" ? <Mobile /> : <Desktop />;
}

export default ResponsiveRoute;
