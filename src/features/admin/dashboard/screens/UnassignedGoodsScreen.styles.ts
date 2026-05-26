/* Hallmark · macrostructure: Bento Grid · genre: modern-minimal · tone: utilitarian
 * theme: brand-aligned app theme · semantic warm tints reserved for urgency only
 * Sections (DOM order): Header (left-aligned + count chip) · Bento triage panel
 * (Total · Plus ancien · Aérien · Maritime) · Queue list · Empty state
 * pre-emit critique: P5 H5 E4 S5 R5 V5
 */
import { StyleSheet } from "react-native";

export const createStyles = (colors: any, _isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background.default,
    },
  });
