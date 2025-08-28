import { useEffect, useState } from "react";

export interface Point {
  x: number;
  y: number;
  id: number;
}

export const useTouch = ({
  wrapperRef,
}: {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const [touches, setTouches] = useState<Map<number, Point>>(new Map());

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault();
      el.setPointerCapture?.(e.pointerId);
      setTouches((prev) => {
        const next = new Map(prev);
        next.set(e.pointerId, { x: e.clientX, y: e.clientY, id: e.pointerId });
        return next;
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!touches.has(e.pointerId)) return;
      e.preventDefault();
      setTouches((prev) => {
        if (!prev.has(e.pointerId)) return prev;
        const next = new Map(prev);
        next.set(e.pointerId, { x: e.clientX, y: e.clientY, id: e.pointerId });
        return next;
      });
    };

    const endPointer = (e: PointerEvent) => {
      setTouches((prev) => {
        if (!prev.has(e.pointerId)) return prev;
        const next = new Map(prev);
        next.delete(e.pointerId);
        return next;
      });
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: false });
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    el.addEventListener("pointerup", endPointer, { passive: true });
    el.addEventListener("pointercancel", endPointer, { passive: true });
    el.addEventListener("pointerleave", endPointer, { passive: true });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endPointer);
      el.removeEventListener("pointercancel", endPointer);
      el.removeEventListener("pointerleave", endPointer);
    };
  }, [touches, wrapperRef]);

  return { touches };
};
