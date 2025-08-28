import "./touchPoint.css";

export const TouchPoint = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      className="touchPoint"
      style={{
        left: x - 44,
        top: y - 44,
      }}
    />
  );
};

export const WinnerTouchPoint = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      className="winnerTouchPoint"
      style={{
        left: x - 44,
        top: y - 44,
      }}
    />
  );
};
