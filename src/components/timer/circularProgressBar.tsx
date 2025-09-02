import { useMemo } from "react";
import "./timer.css";

interface CircleProgressProps {
  size?: number; // viewport px (width/height)
  strokeWidth?: number;
}

export default function CircleProgress({
  size = 120,
  strokeWidth = 10,
}: CircleProgressProps) {
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      className="circularProgressBar"
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 3}
          fill="none"
          strokeWidth={strokeWidth}
          className="progressCircleTrack"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 3}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          className="progressCircle"
        />
      </g>
    </svg>
  );
}
