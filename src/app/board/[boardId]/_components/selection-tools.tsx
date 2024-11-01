"use client";

import { memo } from "react";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

import { useMutation, useSelf } from "@liveblocks/react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { Camera, Color } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useDeleteLayers } from "@/hooks/use-delete-layers";

import { ColorPicker } from "./color-picker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    // Q:为什么liveLayerIds中最前的内容显示在最后面？
    // A:因为在layer.tsx中的useLayerIds中，使用了reverse()方法
    // Q:这里的useLayerIds在哪里使用了？
    // A:在layer.tsx中的useLayerIds中使用了
    // Q:layer.tsx在哪
    // A:在src/app/board/%5BboardId%5D/_components/layer.tsx
    // Q:我并没有看见layer.tsx
    // A:因为你没有看见，所以你需要看见

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        // const arr = liveLayerIds.toArray();
        const arr = liveLayerIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }

        // for(let i=0; i<indices.length; i++){
        //   liveLayerIds.move(indices[i], i)
        // }

        for (let i = indices.length - 1; i >= 0; i--) {
          // liveLayerIds.move(indices[i], liveLayerIds.length - 1);
          // for multiple selection?
          liveLayerIds.move(indices[i],arr.length - 1 - (indices.length - 1 - i));
        }
      },
      [selection]
    );

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        // const arr = liveLayerIds.toArray();
        const arr = liveLayerIds.toImmutable();
        for (let i = 0; i < arr.length; i++) {
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    // change the fill color of the selected layers
    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();

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
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5 ">
          <Hint label="Bring to front">
            <Button variant="board" size="icon" onClick={moveToFront}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back">
            <Button variant="board" size="icon" onClick={moveToBack}>
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
