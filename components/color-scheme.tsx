"use client";

import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLOR_SCHEMES } from "@/constants";
import { auth } from "@clerk/nextjs/server";

async function updateColorScheme(scheme: string) {}

export default async function ColorScheme() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata?.userId as string;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Color scheme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {COLOR_SCHEMES.map((scheme) => {
          return (
            <DropdownMenuItem onClick={() => updateColorScheme(scheme)}>
              {scheme.split("-")[1][0].toUpperCase()}
              {scheme.split("-")[1].slice(1)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
