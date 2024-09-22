import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ModalProvider } from "@/context/ModalProvider";
import { DarkModeProvider } from "@/context/DarkModeContext";
import { TabProvider } from "@/context/TabContext";
import { NavTreeProvider } from "@/context/TreeContext";
import { ViewProvider } from "@/context/ViewContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Text and Document Analysis",
  description: "Deep Text and Document Analysis for your Research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <DarkModeProvider>
        <TabProvider>
          <NavTreeProvider>
            <ViewProvider>
              <html lang="en">
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  {children}
                </body>
              </html>
            </ViewProvider>
          </NavTreeProvider>
        </TabProvider>
      </DarkModeProvider>
    </ModalProvider>
  );
}
