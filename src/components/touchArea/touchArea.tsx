import "./touchArea.css";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { TouchPoint } from "../touchPoint/touchPoint";
import { useTouch, type Point } from "../../hooks/useTouch";
import CountdownTimer from "../timer/timer";

export const TouchArea: FC<{
  numberOfWinners: number;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  numberOfWinners,
  setGameStarted,
}: {
  numberOfWinners: number;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { touches } = useTouch({ wrapperRef });
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [countdownOver, setCountdownOver] = useState<boolean>(false);
  const [winners, setWinners] = useState<Point[]>([]);

  const timesUp = useCallback(() => {
    if (touches.size === 0) return;

    const touchArray = Array.from(touches.values());
    const selectedWinners: Point[] = [];

    while (selectedWinners.length < numberOfWinners) {
      const randomIndex = Math.floor(Math.random() * touchArray.length);
      const winner = touchArray[randomIndex];

      if (!selectedWinners.includes(winner)) {
        selectedWinners.push(winner);
      }
    }

    setWinners(selectedWinners);
    setShowTimer(false);
    setCountdownOver(true);
  }, [touches, numberOfWinners, setWinners, setShowTimer, setCountdownOver]);

  useEffect(() => {
    if (numberOfWinners <= touches.size) {
      setShowTimer(true);
    } else {
      setShowTimer(false);
    }
  }, [touches?.size, numberOfWinners]);

  return (
    <div ref={wrapperRef} className="container">
      {winners?.length < 1
        ? [...touches.entries()].map(([id, point]) => (
            <TouchPoint key={id} x={point.x} y={point.y} isWinner={false} />
          ))
        : winners.map((point) => (
            <TouchPoint
              key={point.id}
              x={point.x}
              y={point.y}
              isWinner={true}
            />
          ))}

      {showTimer && !countdownOver ? (
        <CountdownTimer initialSeconds={5} onComplete={timesUp} />
      ) : null}
      {countdownOver ? (
        <div className="restartContainer">
          <button
            className="buttonStyled"
            onClick={() => {
              setWinners([]);
              setCountdownOver(false);
            }}
          >
            Restart
          </button>
          <button
            className="buttonStyled"
            onClick={() => setGameStarted(false)}
          >
            Home
          </button>
        </div>
      ) : null}
    </div>
  );
};
