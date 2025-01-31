"use client";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <main className="scroll-smooth" suppressHydrationWarning>
        {children}
      </main>
    </NextThemesProvider>
  );
}
