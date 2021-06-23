import { useEffect, useState } from "react";

export default function Loading() {
  const [width, setWidth] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setWidth((width) => (width === 99 ? 99 : width + 1));
    }, 1);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-medium to-red-primary`}
      style={{ width: `${width}vw` }}
    ></div>
  );
}
