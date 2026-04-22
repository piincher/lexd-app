import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

export const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    pager: {
      flex: 1,
    },
    pagerContent: {
      flexGrow: 1,
    },
    bottomSection: {
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: Math.max(insets.bottom, 16),
      gap: 18,
    },
  });
