import "./touchPoint.css";

export const TouchPoint = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      className="genericTouchPoint touchPoint"
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
      className="genericTouchPoint winnerTouchPoint"
      style={{
        left: x - 60,
        top: y - 60,
      }}
    ></div>
  );
};

export const GroupTouchPoint = ({
  x,
  y,
  color,
}: {
  x: number;
  y: number;
  color: number;
}) => {
  return (
    <div
      className={`genericTouchPoint touchPoint groupTouchPoint${color}`}
      style={{
        left: x - 44,
        top: y - 44,
      }}
    />
  );
};
