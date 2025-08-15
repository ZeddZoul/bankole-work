import localFont from "next/font/local";
import { ReactNode } from "react";

const accentFont = localFont({
  src: "../fonts/accent.ttf",
  display: "swap",
});

interface AccentFontProps {
  children: ReactNode;
  className?: string;
}

export default function AccentFont({
  children,
  className = "",
}: AccentFontProps) {
  return (
    <span className={`${accentFont.className} ${className}`}>{children}</span>
  );
}
