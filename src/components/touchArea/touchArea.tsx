import "./touchArea.css";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { TouchPoint, WinnerTouchPoint } from "../touchPoint/touchPoint";
import { useTouch, type Point } from "../../hooks/useTouch";
import CountdownTimer from "../timer/timer";

export const TouchArea: FC<{
  numberOfWinners: number;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfWinnersOrGroups: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  numberOfWinners,
  setGameStarted,
  setNumberOfWinnersOrGroups,
}: {
  numberOfWinners: number;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfWinnersOrGroups: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { touches } = useTouch({ wrapperRef });
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [countdownOver, setCountdownOver] = useState<boolean>(false);
  const [winners, setWinners] = useState<Point[]>([]);

  const timesUp = useCallback(() => {
    if (touches.size === 0) return;

    let touchArray = Array.from(touches.values());
    const selectedWinners: Point[] = [];

    while (selectedWinners.length < numberOfWinners) {
      const randomIndex = Math.floor(Math.random() * touchArray.length);
      const winner = touchArray[randomIndex];
      touchArray = touchArray.filter((_, i) => i !== randomIndex);

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
            <TouchPoint key={id} x={point.x} y={point.y} />
          ))
        : winners.map((point) => (
            <WinnerTouchPoint key={point.id} x={point.x} y={point.y} />
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
            onClick={() => {
              setNumberOfWinnersOrGroups(1);
              setGameStarted(false);
            }}
          >
            Home
          </button>
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          height: 30,
          width: 30,
          borderRadius: "50%",
          border: "2px solid white",
          position: "absolute",
          top: 4,
          right: 4,
          userSelect: "none",
        }}
        onClick={() => {
          setNumberOfWinnersOrGroups(1);
          setGameStarted(false);
        }}
      >
        &times;
      </div>
    </div>
  );
};
