import "./touchPoint.css";

export const TouchPoint = ({
  x,
  y,
  isWinner,
}: {
  x: number;
  y: number;
  isWinner: boolean;
}) => {
  return (
    <div
      className="touchPoint"
      style={{
        left: x - 44,
        top: y - 44,
        backgroundColor: isWinner
          ? "rgb(10, 133, 98)"
          : "rgba(0, 152, 212, 0.5)",
        border: isWinner ? "4px solid white" : "4px solid #0098d4",
      }}
    />
  );
};
