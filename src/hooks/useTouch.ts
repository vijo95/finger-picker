import { useCallback, useEffect, useState } from "react";

export const useTouch = () => {
  const [touches, setTouches] = useState<TouchList | null>(null);

  const handleTouch = useCallback((event: TouchEvent) => {
    if (event?.touches) {
      setTouches(event.touches);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("touchstart", (event) =>
      handleTouch(event as TouchEvent)
    );
    window.addEventListener("touchmove", (event) =>
      handleTouch(event as TouchEvent)
    );
    window.addEventListener("touchend", (event) =>
      handleTouch(event as TouchEvent)
    );
  }, [handleTouch]);

  return { touches };
};
