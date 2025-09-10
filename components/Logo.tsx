import localFont from "next/font/local";
import { ReactNode } from "react";

const logoFont = localFont({
  src: "../public/fonts/logo.ttf",
  display: "swap",
});

interface LogoProps {
  children: ReactNode;
  className?: string;
}

export default function Logo({ children, className = "" }: LogoProps) {
  return (
    <span
      className={`${logoFont.className} ${className} pointer-events-none select-none`}
    >
      {children}
    </span>
  );
}
