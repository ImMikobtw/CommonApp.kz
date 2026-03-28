"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ToasterProvider } from "./toaster-provider";

type Props = {
    children: ReactNode;
};

export function AppProvider({ children }: Props) {
  return (
    <QueryProvider>
      {children}
      <ToasterProvider />
    </QueryProvider>
  );
}