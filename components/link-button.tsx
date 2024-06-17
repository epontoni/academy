"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { MenuItem } from "@/types";

export default function LinkButton({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const [side, setSide] = useState<"top" | "right">("top");
  const isActive = pathname === item.href;
  useLayoutEffect(() => {
    function updateWindowSize() {
      if (window.innerWidth > 766) {
        setSide("right");
      } else {
        setSide("top");
      }
    }
    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn("rounded-lg", isActive && "bg-muted")}
            aria-label={item.label}
          >
            <Link href={item.href}>
              <item.icon className="size-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} sideOffset={5}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
