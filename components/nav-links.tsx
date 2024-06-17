"use client";

import { MENU_ITEMS } from "@/constants";

import LinkButton from "./link-button";

export default function NavLinks() {
  return (
    <>
      {MENU_ITEMS.map((item, index) => (
        <LinkButton key={index} item={item} />
      ))}
    </>
  );
}
