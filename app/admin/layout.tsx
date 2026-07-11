import type { Metadata } from "next";

import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Astro Lab",
  description: "Learn Science Smarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      {children}
    </TooltipProvider>
  );
}