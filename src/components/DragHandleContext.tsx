"use client";
import { createContext, useContext } from "react";

// Holds dnd-kit listeners + attributes to spread onto a drag handle element.
// Empty object when not inside a SortableTile (standalone use).
export type DragHandleProps = Record<string, unknown>;
export const DragHandleContext = createContext<DragHandleProps>({});
export const useDragHandle = () => useContext(DragHandleContext);
