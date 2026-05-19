import { useMemo } from "react";
import { userData } from "@src/shared/types/user";

export type SectionItem =
  | { type: "header"; letter: string; count: number }
  | { type: "client"; data: userData };

/**
 * Transform flat client list into sectioned list with alphabet headers.
 */
export const useSectionedClients = (clients: userData[]): SectionItem[] => {
  return useMemo(() => {
    const grouped = new Map<string, userData[]>();
    clients.forEach((c) => {
      const letter = (c.lastName?.[0] || c.firstName?.[0] || "#").toUpperCase();
      if (!grouped.has(letter)) grouped.set(letter, []);
      grouped.get(letter)!.push(c);
    });
    const sortedLetters = Array.from(grouped.keys()).sort();
    const result: SectionItem[] = [];
    sortedLetters.forEach((letter) => {
      const group = grouped.get(letter)!;
      result.push({ type: "header", letter, count: group.length });
      group.forEach((client) => result.push({ type: "client", data: client }));
    });
    return result;
  }, [clients]);
};
