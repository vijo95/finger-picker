import "./touchPoint.css";

export const TouchPoint = ({ x, y }: { x: number; y: number }) => {
  return (
    <div
      className="touchPoint"
      style={{
        left: x - 30,
        top: y - 30,
      }}
    />
  );
};
