import "./touchArea.css";
import { useEffect, useRef, useState, type FC } from "react";
import { TouchPoint } from "../touchPoint/touchPoint";
import { useTouch } from "../../hooks/useTouch";
import CountdownTimer from "../timer/timer";

export const TouchArea: FC<{ numberOfWinners: number }> = ({
  numberOfWinners,
}: {
  numberOfWinners: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { touches } = useTouch({ wrapperRef });
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [countdownOver, setCountdownOver] = useState<boolean>(false);

  useEffect(() => {
    if (touches.size > numberOfWinners) {
      setShowTimer(true);
    } else {
      setShowTimer(false);
    }
  }, [touches, numberOfWinners]);

  console.log([...touches.entries()]);

  return (
    <div ref={wrapperRef} className="container">
      {[...touches.entries()].map(([id, point]) => (
        <TouchPoint key={id} x={point.x} y={point.y} />
      ))}
      {showTimer && !countdownOver ? (
        <CountdownTimer
          initialSeconds={3}
          onComplete={() => setCountdownOver(true)}
        />
      ) : null}
    </div>
  );
};
