import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";

export const createStyles = (colors: any) => StyleSheet.create({
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary.main,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
  },
  revokeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.status.error,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
    gap: 8,
  },
  revokeButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: colors.text.inverse,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  revokedNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.status.error + '15',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
  },
  revokedNoticeText: {
    fontSize: 15,
    fontFamily: Fonts.meduim,
    color: colors.status.error,
  },
});
