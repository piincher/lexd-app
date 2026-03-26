import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingBottom: 24,
  },
  content: {
    paddingHorizontal: 20,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  stats: {
    flexDirection: "row",
    gap: 12,
  },
});
