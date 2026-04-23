import { StyleSheet } from "react-native";
import { Theme } from '@src/constants/Theme';

export const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.background.paper,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Theme.colors.text.primary,
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
  },
  clearBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Theme.colors.text.disabled,
    alignItems: "center",
    justifyContent: "center",
  },
});
