import type { Metadata } from "next";
import type { ReactNode } from "react";
import lingoPigIcon from "../../lingo-pig-icon.png";
import "./globals.css";

export const metadata: Metadata = {
  title: "LingoPig",
  description: "Speak the English translation after reading a Chinese prompt.",
  icons: {
    icon: [
      {
        url: lingoPigIcon.src,
        type: "image/png"
      }
    ],
    shortcut: [
      {
        url: lingoPigIcon.src,
        type: "image/png"
      }
    ],
    apple: [
      {
        url: lingoPigIcon.src,
        type: "image/png"
      }
    ]
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
