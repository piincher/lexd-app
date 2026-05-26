import type { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type ShippingMode = "all" | "air" | "sea";

export interface FilterOption {
  value: ShippingMode;
  label: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export const FILTER_OPTIONS: FilterOption[] = [
  { value: "all", label: "Tous", icon: "filter-variant" },
  { value: "sea", label: "Maritime", icon: "ferry" },
  { value: "air", label: "Aérien", icon: "airplane" },
];
