import { useEffect, useState } from "react";

function useDeviceType() {
  const [device, setDevice] = useState(
    window.innerWidth > 1024 ? "desktop" : "mobile"
  );

  useEffect(() => {
    const checkDevice = () => {
      setDevice(window.innerWidth > 1024 ? "desktop" : "mobile");
    };
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return device;
}

export default useDeviceType;
