import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { Theme } from "@src/constants/Theme";
import { getInitials, getAvatarColor } from "../../lib/clientUtils";
import { userData } from "@src/shared/types/user";

const { width: SCREEN_W } = Dimensions.get("window");
const HEADER_HEIGHT = 280;

interface ClientDetailParallaxHeaderProps {
  user: userData | undefined;
  scrollY: SharedValue<number>;
}

export const ClientDetailParallaxHeader: React.FC<ClientDetailParallaxHeaderProps> = ({ user, scrollY }) => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const avatarColors = getAvatarColor(`${user?.firstName} ${user?.lastName}`);
  const initials = getInitials(user?.firstName, user?.lastName);
  const isBlocked = user?.blocked?.isBlocked ?? false;

  const bgStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scrollY.value, [0, HEADER_HEIGHT], [0, -HEADER_HEIGHT / 2], Extrapolation.CLAMP) }],
    opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT * 0.8], [1, 0], Extrapolation.CLAMP),
  }));

  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(scrollY.value, [0, HEADER_HEIGHT], [1, 0.6], Extrapolation.CLAMP) }],
    opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT * 0.6], [1, 0], Extrapolation.CLAMP),
  }));

  const nameStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT * 0.5], [1, 0], Extrapolation.CLAMP),
    transform: [{ translateY: interpolate(scrollY.value, [0, HEADER_HEIGHT * 0.5], [0, -20], Extrapolation.CLAMP) }],
  }));

  return (
    <View style={{ height: HEADER_HEIGHT, position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}>
      <Animated.View style={[{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }, bgStyle]}>
        <LinearGradient colors={Theme.gradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }} />
      </Animated.View>

      <View style={{ position: "absolute", top: 16, left: 16, right: 16, flexDirection: "row", justifyContent: "space-between", zIndex: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} accessibilityRole="button" accessibilityLabel="Retour">
          <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
        </TouchableOpacity>
        {isBlocked && (
          <View style={[styles.badge, { backgroundColor: colors.status.error }]}>
            <Ionicons name="ban" size={12} color={colors.text.inverse} />
            <Text style={{ color: colors.text.inverse, fontSize: 12, fontWeight: "700" }}>Bloqué</Text>
          </View>
        )}
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 20 }}>
        <Animated.View style={avatarStyle}>
          {user?.avatar?.url ? (
            <Image source={{ uri: user.avatar.url }} style={styles.avatarImage} />
          ) : (
            <LinearGradient colors={avatarColors} style={styles.avatar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.avatarText}>{initials}</Text>
            </LinearGradient>
          )}
        </Animated.View>
        <Animated.View style={[{ alignItems: "center", marginTop: 12 }, nameStyle]}>
          <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.role}>{user?.role || "Client"}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = {
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  badge: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 32,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.3)",
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  name: {
    fontSize: 24,
    fontWeight: "800" as const,
    color: "#FFFFFF",
  },
  role: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
    textTransform: "capitalize" as const,
  },
};
