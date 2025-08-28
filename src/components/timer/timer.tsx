import React, { useEffect, useState } from "react";
import "./timer.css";

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
    if (secondsLeft <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onComplete]);
  console.log(secondsLeft);

  return <div className="timer">{secondsLeft}</div>;
};

export default CountdownTimer;
