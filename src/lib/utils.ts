import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Camera } from "@/types/canvas";

const COLORS = [
  "#03fcec",
  "#9febfc",
  "#abfca4",
  "#c288eb",
  "#ed93c6",
  "#d1f783",
  "#5b5c5c",
  "#363636",
  "#f7f7f7",
  "#a3a3a3",
  "#ff5733",
  "#33ff57",
  "#3357ff",
  "#f1c40f",
  "#8e44ad",
  "#e67e22",
  "#3498db",
  "#2ecc71",
  "#e74c3c",
  "#1abc9c",
  "#34495e",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#7f8c8d",
  "#27ae60",
  "#2980b9",
  "#16a085",
  "#8e44ad",
  "#2c3e50",
  "#72f121",
  "#f12179",
  "#7f942f",
  "#9d7f2f",
  // "#2f7f94",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
