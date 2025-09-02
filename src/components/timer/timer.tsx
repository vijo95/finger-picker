import React, { memo, useEffect, useState } from "react";
import "./timer.css";
import CircleProgress from "./circularProgressBar";

interface CountdownProps {
  initialSeconds: number;
  onComplete?: () => void; // optional callback when timer reaches 0
}

const CountdownTimer: React.FC<CountdownProps> = ({
  initialSeconds,
  onComplete,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete?.();
      return;
    }
  }, [secondsLeft, onComplete]);

  return (
    <>
      <div className="timer">{secondsLeft}</div>
      <CircleProgress size={100} strokeWidth={5} />
    </>
  );
};

export default memo(CountdownTimer);
