import React from "react";
import { View, Text, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./PlatformVersionCard.styles";

type PlatformVersionCardProps = {
  platform: "android" | "ios";
  minVersion: string;
  latestVersion: string;
  forceUpdate: boolean;
  storeUrl: string;
  onMinVersionChange: (value: string) => void;
  onLatestVersionChange: (value: string) => void;
  onForceUpdateChange: (value: boolean) => void;
  onStoreUrlChange: (value: string) => void;
};

const PLATFORM_CONFIG = {
  android: {
    label: "Android",
    icon: "android" as const,
    color: "#3DDC84",
  },
  ios: {
    label: "iOS",
    icon: "apple" as const,
    color: "#007AFF",
  },
};

export function PlatformVersionCard({
  platform,
  minVersion,
  latestVersion,
  forceUpdate,
  storeUrl,
  onMinVersionChange,
  onLatestVersionChange,
  onForceUpdateChange,
  onStoreUrlChange,
}: PlatformVersionCardProps) {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => getStyles(colors, isDark), [colors, isDark]);
  const config = PLATFORM_CONFIG[platform];
  const isOutdated = minVersion && latestVersion && minVersion !== latestVersion;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: config.color + "15" }]}>
          <MaterialCommunityIcons name={config.icon} size={22} color={config.color} />
        </View>
        <Text style={styles.title}>{config.label}</Text>
        {isOutdated && (
          <View style={[styles.badge, { backgroundColor: colors.status.warning + "15" }]}>
            <Text style={[styles.badgeText, { color: colors.status.warning }]}>Mise à jour requise</Text>
          </View>
        )}
      </View>

      <View style={styles.versionRow}>
        <View style={styles.versionItem}>
          <Text style={styles.versionLabel}>Min. requise</Text>
          <Text style={styles.versionValue}>{minVersion || "—"}</Text>
        </View>
        <MaterialCommunityIcons name="arrow-right" size={16} color={colors.text.disabled} />
        <View style={styles.versionItem}>
          <Text style={styles.versionLabel}>Dernière</Text>
          <Text style={styles.versionValue}>{latestVersion || "—"}</Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Version minimale</Text>
        <View style={styles.input}>
          <MaterialCommunityIcons name="tag-outline" size={16} color={colors.text.secondary} />
          <Text
            style={styles.inputText}
            onPress={() => {}}
          >
            {minVersion}
          </Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Dernière version</Text>
        <View style={styles.input}>
          <MaterialCommunityIcons name="tag" size={16} color={colors.text.secondary} />
          <Text style={styles.inputText}>{latestVersion}</Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Lien magasin</Text>
        <View style={styles.input}>
          <MaterialCommunityIcons name="link-variant" size={16} color={colors.text.secondary} />
          <Text style={styles.inputText} numberOfLines={1}>
            {storeUrl || "Non configuré"}
          </Text>
        </View>
      </View>

      <View style={styles.toggleRow}>
        <View style={styles.toggleLabelCol}>
          <Text style={styles.toggleLabel}>Forcer la mise à jour</Text>
          <Text style={styles.toggleSubLabel}>Bloque l&apos;app si version obsolète</Text>
        </View>
        <Switch
          value={forceUpdate}
          onValueChange={onForceUpdateChange}
          trackColor={{ false: colors.neutral[300], true: colors.status.error }}
          thumbColor={forceUpdate ? colors.status.error : colors.background.paper}
        />
      </View>
    </View>
  );
}
