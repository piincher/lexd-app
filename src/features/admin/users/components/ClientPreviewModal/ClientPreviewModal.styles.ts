export const styles = {
  overlay: {
    flex: 1,
    justifyContent: "flex-end" as const,
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 16,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: "center" as const,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "700" as const,
  },
  phone: {
    fontSize: 14,
    marginTop: 2,
  },
  badge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    alignSelf: "flex-start" as const,
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700" as const,
  },
  actions: {
    flexDirection: "row" as const,
    justifyContent: "center" as const,
    gap: 12,
  },
  actionBtn: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    gap: 6,
    flex: 1,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600" as const,
  },
  viewBtn: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  viewBtnText: {
    fontSize: 15,
    fontWeight: "700" as const,
  },
};
