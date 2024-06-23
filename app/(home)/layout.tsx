import type { Metadata } from "next";
import { GraduationCap, Loader, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import NavLinks from "@/components/nav-links";
import SearchBar from "@/components/search-bar";
import SettingButton from "@/components/setting-button";
import UserMenu from "@/components/user-menu";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Academy",
  description: "Generated by create next app",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-screen w-full pb-[56px] md:pl-[56px] md:pb-0">
      <aside className="bg-background inset-x bottom-0 border-t w-screen md:inset-y md:left-0 fixed z-20 flex justify-between md:h-full md:flex-col md:border-r md:w-auto text-primary">
        <div className="p-2 hidden sm:block">
          <Button variant="outline" size="icon" aria-label="Logo" asChild>
            <Link href="/">
              <GraduationCap className="size-5 transition-transform duration-300 transform hover:-rotate-12 hover:scale-110" />
            </Link>
          </Button>
        </div>
        <nav className="md:grid flex flex-row gap-1 p-2 mx-auto">
          <NavLinks />
        </nav>
        <nav className="hidden mt-auto sm:grid gap-1 p-2 mr-2 md:mr-0">
          <SettingButton />
        </nav>
      </aside>
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex justify-between h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Academy</h1>
          <div className="hidden sm:flex sm:gap-1">
            <SearchBar />
          </div>

          <div className="flex gap-2">
            <ThemeToggle />
            <ClerkLoading>
              <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedOut>
                <Button asChild>
                  <SignInButton mode="modal" fallbackRedirectUrl="/dashboard" />
                </Button>
                <Button asChild variant="secondary">
                  <SignUpButton mode="modal" fallbackRedirectUrl="/dashboard" />
                </Button>
              </SignedOut>
              <SignedIn>
                <UserMenu />
              </SignedIn>
            </ClerkLoaded>
          </div>
        </header>
        <main className="h-full p-4 md:p-4 mb-[3rem] md:mb-0">{children}</main>
      </div>
    </div>
  );
}
