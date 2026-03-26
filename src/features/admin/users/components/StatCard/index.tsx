import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  color: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  label, 
  value, 
  color, 
  delay = 0 
}) => (
  <Animated.View 
    entering={FadeInUp.delay(delay).duration(500)}
    style={styles.container}
  >
    <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
      <MaterialCommunityIcons name={icon as any} size={24} color={color} />
    </View>
    <View style={styles.content}>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
  },
  label: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
});
