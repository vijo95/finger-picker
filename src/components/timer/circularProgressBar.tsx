import { useMemo } from "react";
import "./timer.css";

interface CircleProgressProps {
  percentage: number; // 0..100
  size?: number; // viewport px (width/height)
  strokeWidth?: number;
  durationMs?: number; // animation duration in ms
  trackColor?: string;
}

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));

export default function CircleProgress({
  percentage,
  size = 120,
  strokeWidth = 10,
}: CircleProgressProps) {
  const pct = clamp(percentage);
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className="circularProgressBar"
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="progressCircleTrack"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
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
