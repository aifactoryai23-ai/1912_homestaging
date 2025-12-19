import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export function ScrollArea({ className = "", children, ...props }) {
  return (
    <ScrollAreaPrimitive.Root className={`relative ${className}`} {...props}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

export function ScrollBar({ className = "", orientation = "horizontal", ...props }) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      orientation={orientation}
      className={`flex touch-none select-none p-[2px] ${
        orientation === "horizontal" ? "h-2 w-full" : "h-full w-2"
      } ${className}`}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-white/20 hover:bg-white/30" />
    </ScrollAreaPrimitive.Scrollbar>
  );
}
