import { StyleSheet } from "react-native";

export const createStyles = (colors: any) => StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.paper,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: "500",
  },
  loader: {
    marginLeft: 8,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  clearBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.text.disabled,
    alignItems: "center",
    justifyContent: "center",
  },
  voiceButton: {
    padding: 6,
    marginLeft: 4,
  },
});
