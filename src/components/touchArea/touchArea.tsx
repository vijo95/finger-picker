import "./touchArea.css";
import React, { useCallback, useRef, useState, type FC } from "react";
import {
  GroupTouchPoint,
  TouchPoint,
  WinnerTouchPoint,
} from "../touchPoint/touchPoint";
import { useTouch, type Point } from "../../hooks/useTouch";
import CountdownTimer from "../timer/timer";
import type { GameMode } from "../../App";

export const TouchArea: FC<{
  gameMode: GameMode;
  numberOfWinnersOrGroups: number;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfWinnersOrGroups: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  gameMode,
  numberOfWinnersOrGroups,
  setGameStarted,
  setNumberOfWinnersOrGroups,
}: {
  gameMode: GameMode;
  numberOfWinnersOrGroups: number;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfWinnersOrGroups: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { touches } = useTouch({ wrapperRef });
  const [countdownOver, setCountdownOver] = useState<boolean>(false);
  const [winners, setWinners] = useState<Point[]>([]);
  const [groups, setGroups] = useState<Point[][]>([]);

  const timesUp = useCallback(() => {
    if (touches.size === 0) return;

    let touchArray = Array.from(touches.values());
    if (gameMode === "groups") {
      for (let i = touchArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [touchArray[i], touchArray[j]] = [touchArray[j], touchArray[i]];
      }

      const groups: Point[][] = Array.from(
        { length: numberOfWinnersOrGroups },
        () => []
      );

      touchArray.forEach((touch, i) => {
        const groupIndex = i % numberOfWinnersOrGroups;
        groups[groupIndex].push(touch);
      });
      setGroups(groups);
    }
    if (gameMode === "winners") {
      const selectedWinners: Point[] = [];
      while (selectedWinners.length < numberOfWinnersOrGroups) {
        const randomIndex = Math.floor(Math.random() * touchArray.length);
        const winner = touchArray[randomIndex];
        touchArray = touchArray.filter((_, i) => i !== randomIndex);

        if (!selectedWinners.includes(winner)) {
          selectedWinners.push(winner);
        }
      }
      setWinners(selectedWinners);
    }

    setCountdownOver(true);
  }, [
    touches,
    numberOfWinnersOrGroups,
    gameMode,
    setGroups,
    setWinners,
    setCountdownOver,
  ]);

  return (
    <div ref={wrapperRef} className="container">
      {winners?.length < 1 && groups?.length < 1
        ? [...touches.entries()].map(([id, point]) => (
            <TouchPoint key={id} x={point.x} y={point.y} />
          ))
        : 1 <= winners?.length
        ? winners.map((point) => (
            <WinnerTouchPoint key={point.id} x={point.x} y={point.y} />
          ))
        : 1 <= groups?.length
        ? groups.map((group, i) => (
            <React.Fragment key={i}>
              {group?.map((g) => (
                <GroupTouchPoint key={g.id} x={g.x} y={g.y} color={i + 1} />
              ))}
            </React.Fragment>
          ))
        : null}

      {numberOfWinnersOrGroups <= touches.size && !countdownOver ? (
        <CountdownTimer initialSeconds={5} onComplete={timesUp} />
      ) : null}
      {countdownOver ? (
        <div className="restartContainer">
          <button
            className="buttonStyled"
            onClick={() => {
              setWinners([]);
              setGroups([]);
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
        className="closedIcon"
        onClick={() => {
          setNumberOfWinnersOrGroups(1);
          setGameStarted(false);
        }}
      >
        &times;
      </div>
      {winners?.length < 1 && groups?.length < 1 && touches.size < 1 ? (
        <span className="fingerOn">Fingers on</span>
      ) : null}
    </div>
  );
};
