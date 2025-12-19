import React from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Heading,
  IconButton,
  Card,
  Flex,
  Grid,
  Text,
  Inset,
} from "@radix-ui/themes";

export default function DiscoverList({ left = [], right = [], onSelect }) {
  const { t } = useTranslation("common");

  const PER_COLUMN = 3;

  const totalPages = Math.max(
    Math.ceil((left?.length || 0) / PER_COLUMN),
    Math.ceil((right?.length || 0) / PER_COLUMN),
    1
  );

  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  const start = page * PER_COLUMN;
  const leftPage = (left || []).slice(start, start + PER_COLUMN);
  const rightPage = (right || []).slice(start, start + PER_COLUMN);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const runItem = (item) => {
    if (!item) return;
    if (typeof item.onClick === "function") item.onClick();
    else onSelect?.(item);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading size="6" weight="medium">
          {t("images.ui.discover", "Discover something new")}
        </Heading>

        <Flex gap="2" align="center">
          <IconButton
            variant="soft"
            radius="full"
            color="gray"
            disabled={!canPrev}
            onClick={() => canPrev && setPage((p) => Math.max(0, p - 1))}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </IconButton>

          <IconButton
            variant="soft"
            radius="full"
            color="gray"
            disabled={!canNext}
            onClick={() =>
              canNext && setPage((p) => Math.min(totalPages - 1, p + 1))
            }
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </IconButton>
        </Flex>
      </div>

      <div className="mt-10 sm:mt-12">
        <Grid columns={{ initial: "2", md: "2" }} gap={{ initial: "6", sm: "8" }}>
          <Flex direction="column" gap="4">
            {leftPage.map((item) => (
              <Card
                key={item.key}
                role="button"
                tabIndex={0}
                onClick={() => runItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    runItem(item);
                  }
                }}
                variant="surface"
                size="2"
                className="cursor-pointer transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[var(--radius-4)]"
              >
                <Flex align="center" gap="4">
                  <Inset side="all" clip="padding-box">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-16 w-16 rounded-[var(--radius-4)] object-cover ring-1 ring-white/10"
                      loading="lazy"
                      draggable={false}
                    />
                  </Inset>

                  <Text size="4" weight="medium" className="text-white/85 leading-relaxed">
                    {item.title}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>

          <Flex direction="column" gap="4">
            {rightPage.map((item) => (
              <Card
                key={item.key}
                role="button"
                tabIndex={0}
                onClick={() => runItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    runItem(item);
                  }
                }}
                variant="surface"
                size="2"
                className="cursor-pointer transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-[var(--radius-4)]"
              >
                <Flex align="center" gap="4">
                  <Inset side="all" clip="padding-box">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-16 w-16 rounded-[var(--radius-4)] object-cover ring-1 ring-white/10"
                      loading="lazy"
                      draggable={false}
                    />
                  </Inset>

                  <Text size="4" weight="medium" className="text-white/85 leading-relaxed">
                    {item.title}
                  </Text>
                </Flex>
              </Card>
            ))}
          </Flex>
        </Grid>
      </div>
    </div>
  );
}
