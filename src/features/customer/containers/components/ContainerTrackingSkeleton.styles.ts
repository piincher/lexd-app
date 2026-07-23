import { StyleSheet } from "react-native";
import { HAIRLINE } from "@src/shared/ui/designLanguage";

export const createStyles = (colors: any, isDark?: boolean) => StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
  card: {
    borderWidth: HAIRLINE,
    borderColor: colors.border,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  progressItem: {
    alignItems: "center",
    flex: 1,
  },
  journeySection: {
    marginBottom: 16,
  },
  timelineConnector: {
    alignItems: "center",
    height: 24,
  },
  waypointCard: {
    borderWidth: HAIRLINE,
    borderColor: colors.border,
    borderRadius: 16,
    overflow: "hidden",
  },
  waypointContent: {
    padding: 16,
  },
  wpHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  wpTitleContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  wpTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  wpExpandIndicator: {
    alignItems: "center",
    marginTop: 6,
  },
  estimatedArrivalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timelineDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  goodsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  goodsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  goodsItemInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  goodsItemRight: {
    alignItems: "flex-end",
  },
  pickupCard: {
    backgroundColor: 'transparent',
  },
  pickupHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactInfo: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  helpContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
});
