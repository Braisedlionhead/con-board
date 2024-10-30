"use client";

import { memo } from "react";

import { useSelf } from "@liveblocks/react";
import { Camera, Color } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const selecctionBounds = useSelectionBounds();

    if (!selecctionBounds) return null;

    const x = selecctionBounds?.width / 2 + selecctionBounds.x + camera.x;
    const y = selecctionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker 
        onChange={() => {}} 
        
        />
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
