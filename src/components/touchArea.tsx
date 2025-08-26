import { useTouch } from "../hooks/useTouch";
import { TouchPoint } from "./touchPoint";
import "./touchArea.css";
import { useEffect, useState } from "react";

interface Touch {
  clientX: number;
  clientY: number;
  identifier?: number;
}

const initialCountDown = 5;

export const TouchArea = ({ numberOfWinners }: { numberOfWinners: number }) => {
  const [countDown, setCountDown] = useState<number>(initialCountDown);
  const { touches } = useTouch();

  useEffect(() => {
    if (numberOfWinners > 0) {
      const interval = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);

      if (countDown === 0) {
        clearInterval(interval);
        // pick winner/s
      }

      return () => clearInterval(interval);
    }
  }, [countDown, numberOfWinners]);

  useEffect(() => {
    setCountDown(initialCountDown);
  }, [touches?.length]);

  return (
    <div className="container">
      {Array.from(touches || [])?.map((touch: Touch) => (
        <TouchPoint
          key={touch.identifier}
          x={touch.clientX}
          y={touch.clientY}
        />
      ))}
      {numberOfWinners > 0 ? (
        <div className="countDownOverlay">{countDown}</div>
      ) : null}
    </div>
  );
};
