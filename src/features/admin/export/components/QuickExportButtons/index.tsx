import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import { ExportEntity } from "../../types";
import { ENTITY_CONFIG } from "../../constants";
import { styles } from "./QuickExportButtons.styles";

interface QuickExportButtonsProps {
  onQuickExport: (entity: ExportEntity) => void;
}

export const QuickExportButtons: React.FC<QuickExportButtonsProps> = ({
  onQuickExport,
}) => {
  return (
    <View style={styles.quickExportSection}>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Quick Export
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickExportScroll}
      >
        {Object.entries(ENTITY_CONFIG).map(([entity, config]) => (
          <TouchableOpacity
            key={entity}
            style={[styles.quickExportButton, { borderColor: config.color }]}
            onPress={() => onQuickExport(entity as ExportEntity)}
          >
            <View
              style={[
                styles.quickExportIcon,
                { backgroundColor: config.color },
              ]}
            >
              <Text style={styles.quickExportIconText}>{config.icon}</Text>
            </View>
            <Text variant="bodySmall" style={styles.quickExportLabel}>
              {config.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
