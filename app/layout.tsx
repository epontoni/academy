import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/database/actions/user.actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EP Academy",
  description: "Crece desarrollando habilidades en alta demanda.",
};

async function getData(userId: string) {
  if (userId) {
    const data = await getUserById(userId);

    return data.colorScheme;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata?.userId as string;
  const colorScheme = await getData(userId);
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} ${colorScheme || "theme-yellow"}`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
