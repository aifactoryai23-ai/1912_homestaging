import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.jsx";

export default function HorizontalRail({
  title,
  children,
  scrollStep = 420,
  showArrows = true,
  className = "",
}) {
  const viewportRef = React.useRef(null);

  const scrollBy = (dx) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-white/90">{title}</h2>

        {showArrows ? (
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-scrollStep)}
              className="h-11 w-11 rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
              aria-label="Previous"
            >
              <ChevronLeft className="mx-auto h-5 w-5 text-white/80" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(scrollStep)}
              className="h-11 w-11 rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/15"
              aria-label="Next"
            >
              <ChevronRight className="mx-auto h-5 w-5 text-white/80" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <ScrollArea className="w-full">
          {/* Важно: Radix Viewport ref */}
          <div
            ref={viewportRef}
            className="overflow-x-auto overflow-y-hidden"
          >
            <div className="min-w-max">{children}</div>
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
