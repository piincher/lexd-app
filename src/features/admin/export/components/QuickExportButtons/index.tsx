import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ExportEntity } from "../../types";
import { ENTITY_CONFIG } from "../../constants";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { styles } from "./QuickExportButtons.styles";

interface QuickExportButtonsProps {
  onQuickExport: (entity: ExportEntity) => void;
}

export const QuickExportButtons: React.FC<QuickExportButtonsProps> = ({
  onQuickExport,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.section}>
      <Text variant="titleSmall" style={styles.sectionTitle}>
        Quick Export
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {(Object.entries(ENTITY_CONFIG) as [ExportEntity, typeof ENTITY_CONFIG[ExportEntity]][]).map(
          ([entity, config]) => (
            <Pressable
              key={entity}
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor: colors.background.card,
                  borderColor: config.color + "30",
                },
                pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
              ]}
              onPress={() => onQuickExport(entity)}
            >
              <View
                style={[
                  styles.indicator,
                  { backgroundColor: config.color },
                ]}
              />
              <View style={styles.iconWrap}>
                <MaterialCommunityIcons
                  name={config.icon as any}
                  size={22}
                  color={config.color}
                />
              </View>
              <Text variant="labelMedium" style={styles.label}>
                {config.label}
              </Text>
            </Pressable>
          )
        )}
      </ScrollView>
    </View>
  );
};
