import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-primary focus:text-white focus:top-0 focus:left-0 outline-none focus:ring-4 focus:ring-primary-foreground focus:rounded-br-md transition-transform transform -translate-y-full focus:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
