import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerStatus, CONTAINER_STATUS_LABELS } from '../../../types';

import { createStyles } from './Header.styles';

interface LateAssignmentBannerProps {
  containerStatus: ContainerStatus;
}

export const LateAssignmentBanner: React.FC<LateAssignmentBannerProps> = ({ containerStatus }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const warningBg = colors.status.warning + '26';
  const warningBorder = colors.status.warning + '4D';

  return (
    <View
      style={[
        styles.nonAssignableBanner,
        { backgroundColor: warningBg, borderColor: warningBorder },
      ]}
    >
      <Ionicons name="warning-outline" size={18} color={colors.status.warning} />
      <View style={styles.nonAssignableContent}>
        <Text style={[styles.nonAssignableTitle, { color: colors.status.warning }]}>
          Assignation tardive
        </Text>
        <Text style={styles.nonAssignableText}>
          Ce container est en statut &quot;{CONTAINER_STATUS_LABELS[containerStatus]}&quot;.{'\n'}
          L&apos;assignation est autorisée à des fins de correction, mais aucune notification client ne sera envoyée.
        </Text>
      </View>
    </View>
  );
};
