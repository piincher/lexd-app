import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import type { NavigationProp } from "@react-navigation/native";
import { NotificationBell } from "@src/shared/ui/NotificationBell";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { AnimatedCounter } from "../AnimatedCounter";
import { ExportButton } from "../ExportButton";
import { createStyles } from "./ClientHeader.styles";
import { userData } from "@src/shared/types/user";

interface ClientHeaderProps {
  totalClients: number;
  activeCount: number;
  blockedCount: number;
  navigation: NavigationProp<any>;
  clients: userData[];
  selectionMode?: boolean;
  onToggleSelection?: () => void;
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({
  totalClients,
  activeCount,
  blockedCount,
  navigation,
  clients,
  selectionMode,
  onToggleSelection,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <LinearGradient colors={Theme.gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Retour">
            <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Gestion Clients</Text>
            <Text style={styles.subtitle}>{totalClients} clients au total</Text>
          </View>
          <View style={styles.rightActions}>
            {clients.length > 0 && <ExportButton clients={clients} />}
            {onToggleSelection && (
              <TouchableOpacity onPress={onToggleSelection} style={styles.iconButton} accessibilityRole="button" accessibilityLabel={selectionMode ? "Annuler la sélection" : "Mode sélection"}>
                <Ionicons name={selectionMode ? "close" : "checkbox-outline"} size={22} color={colors.text.inverse} />
              </TouchableOpacity>
            )}
            <NotificationBell onPress={() => navigation.navigate("Notifications")} size={22} color={colors.text.inverse} />
          </View>
        </View>

        <View style={styles.stats}>
          <Animated.View entering={FadeInUp.delay(0).duration(500)} style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: `${colors.text.inverse}20` }]}>
              <Ionicons name="people" size={20} color={colors.text.inverse} />
            </View>
            <View>
              <AnimatedCounter value={totalClients} style={styles.statValue} delay={200} />
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: `${colors.text.inverse}20` }]}>
              <Ionicons name="person" size={20} color={colors.text.inverse} />
            </View>
            <View>
              <AnimatedCounter value={activeCount} style={styles.statValue} delay={350} />
              <Text style={styles.statLabel}>Actifs</Text>
            </View>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.statCard}>
            <View style={[styles.iconCircle, { backgroundColor: `${colors.text.inverse}20` }]}>
              <Ionicons name="ban" size={20} color={colors.text.inverse} />
            </View>
            <View>
              <AnimatedCounter value={blockedCount} style={styles.statValue} delay={500} />
              <Text style={styles.statLabel}>Bloqués</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};
