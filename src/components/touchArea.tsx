import "./touchArea.css";
import { useRef, type FC } from "react";
import { TouchPoint } from "./touchPoint";
import { useTouch } from "../hooks/useTouch";

export const TouchArea: FC<{ numberOfWinners: number }> = ({
  numberOfWinners,
}: {
  numberOfWinners: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { touches } = useTouch({ wrapperRef });

  console.log(numberOfWinners);

  return (
    <div ref={wrapperRef} className="container">
      {[...touches.entries()].map(([id, point]) => (
        <TouchPoint key={id} x={point.x} y={point.y} />
      ))}
    </div>
  );
};
