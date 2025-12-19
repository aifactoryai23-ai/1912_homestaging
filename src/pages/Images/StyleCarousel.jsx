import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Heading, IconButton, Card, Text, Inset } from "@radix-ui/themes";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { SignInButton } from "@clerk/clerk-react";

export default function StyleCarousel({ items = [], onSelect, isSignedIn }) {
  const { t } = useTranslation("common");
  const viewportRef = React.useRef(null);

  const scrollBy = (dx) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  const handleSelect = (card) => {
    if (!card) return;
    onSelect?.(card);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Heading size="5" weight="medium" className="text-white/90">
          {t("images.ui.tryStyle", "Try a style on an image")}
        </Heading>

        <div className="hidden sm:flex items-center gap-2">
          <IconButton
            variant="soft"
            radius="full"
            color="gray"
            aria-label={t("images.ui.prev", "Previous")}
            onClick={() => scrollBy(-420)}
          >
            <ChevronLeft className="h-5 w-5" />
          </IconButton>

          <IconButton
            variant="soft"
            radius="full"
            color="gray"
            aria-label={t("images.ui.next", "Next")}
            onClick={() => scrollBy(420)}
          >
            <ChevronRight className="h-5 w-5" />
          </IconButton>
        </div>
      </div>

      <div className="mt-6">
        <ScrollArea.Root className="style-scrollarea w-full overflow-hidden">
          <ScrollArea.Viewport
            ref={viewportRef}
            className="no-scrollbar flex gap-6 pb-3 overflow-x-auto"
          >
            {items.map((card) => {
              const content = (
                <Card
                  role="button"
                  tabIndex={0}
                  variant="surface"
                  size="2"
                  onClick={() => handleSelect(card)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(card);
                    }
                  }}
                  className="cursor-pointer overflow-hidden transition hover:brightness-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[var(--radius-4)]"
                >
                  <Inset clip="padding-box" side="all">
                    <div className="aspect-[3/4] w-full overflow-hidden">
                      <img
                        src={card.src}
                        alt={t(`images.styles.${card.key}`, card.title)}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  </Inset>
                </Card>
              );

              return (
                <div key={card.key} className="w-[160px] sm:w-[190px] shrink-0">
                  {isSignedIn ? (
                    content
                  ) : (
                    <SignInButton mode="modal">
                      <div>{content}</div>
                    </SignInButton>
                  )}

                  <Text as="div" size="2" className="mt-3 text-center text-white/70">
                    {t(`images.styles.${card.key}`, card.title)}
                  </Text>
                </div>
              );
            })}
          </ScrollArea.Viewport>

          {/* ✅ Radix scrollbar оставляем */}
          <ScrollArea.Scrollbar orientation="horizontal" className="h-2">
            <ScrollArea.Thumb className="bg-white/20 rounded-full" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
}
