import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProviderWrapper } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Astro Lab — Science Learning Platform",
  description: "Master Physics, Chemistry, Biology, Astronomy, Robotics, and more through beautifully designed expert-led learning experiences.",
  keywords: ["science", "education", "online learning", "physics", "chemistry", "astronomy"],
  openGraph: {
    title: "Astro Lab — Science Learning Platform",
    description: "Explore the universe of science with interactive lessons and expert mentors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <AuthProviderWrapper>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0f172a',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#22d3ee', secondary: '#0f172a' },
              },
              error: {
                iconTheme: { primary: '#f43f5e', secondary: '#0f172a' },
              },
            }}
          />
        </AuthProviderWrapper>
      </body>
    </html>
  );
}