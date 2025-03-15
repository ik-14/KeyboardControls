import { useEffect, useState } from "react";

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState("desktop");
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType(width < 768 ? "mobile" : "desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return deviceType;
};
