import { StyleSheet } from "react-native";
import { Fonts } from "@src/constants/Fonts";
import { Theme } from '@src/constants/Theme';

export const createStyles = (colors: any) => StyleSheet.create({
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4a843",
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
    backgroundColor: "#DC2626",
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
    color: "#DC2626",
  },
});
