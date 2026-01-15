"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider wraps the application with next-themes provider.
 * This enables dark mode support using CSS variables and the 'class' attribute.
 *
 * @param props - Component props
 * @returns The provider wrapper
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
