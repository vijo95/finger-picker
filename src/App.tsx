import "./App.css";
import { useEffect, useRef, useState, type JSX } from "react";

interface Point {
  x: number;
  y: number;
}

export default function App(): JSX.Element {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [touches, setTouches] = useState<Map<number, Point>>(new Map());

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      console.log("ASD");
      e.preventDefault();
      el.setPointerCapture?.(e.pointerId);
      setTouches((prev) => {
        const next = new Map(prev);
        next.set(e.pointerId, { x: e.clientX, y: e.clientY });
        return next;
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!touches.has(e.pointerId)) return;
      e.preventDefault();
      setTouches((prev) => {
        if (!prev.has(e.pointerId)) return prev;
        const next = new Map(prev);
        next.set(e.pointerId, { x: e.clientX, y: e.clientY });
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
  }, [touches]);

  return (
    <div
      ref={wrapperRef}
      style={{
        touchAction: "none",
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      {[...touches.entries()].map(([id, point]) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: point.x - 35,
            top: point.y - 35,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "rgba(0, 150, 255, 0.4)",
            border: "2px solid rgba(0, 150, 255, 0.8)",
            pointerEvents: "none", // circles don’t block touches
            transform: "translate3d(0,0,0)", // GPU layer for smoothness
          }}
        />
      ))}
    </div>
  );
}
