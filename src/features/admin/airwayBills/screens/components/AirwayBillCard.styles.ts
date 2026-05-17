import { StyleSheet } from "react-native";

export const getStyles = (colors: any) => StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  awbContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  awbNumber: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  flightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  flightText: {
    fontSize: 13,
    fontWeight: "500",
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  airportBlock: {
    alignItems: "flex-start",
    minWidth: 60,
  },
  airportBlockRight: {
    alignItems: "flex-end",
  },
  airportCode: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  airportLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  routeLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 12,
    height: 20,
  },
  dashedLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  planeIconContainer: {
    position: "absolute",
    left: "50%",
    marginLeft: -14,
    paddingHorizontal: 4,
  },
  planeIcon: {
    transform: [{ rotate: "90deg" }],
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 2,
  },
  statPills: {
    flexDirection: "row",
    gap: 8,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statPillText: {
    fontSize: 12,
    fontWeight: "600",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 12,
    fontWeight: "500",
  },
  capacityContainer: {
    marginTop: 10,
    gap: 4,
  },
  capacityTrack: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  capacityBar: {
    height: "100%",
    borderRadius: 2,
  },
  capacityText: {
    fontSize: 11,
    fontWeight: "500",
  },
});
