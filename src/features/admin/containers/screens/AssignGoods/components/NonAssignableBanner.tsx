import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ContainerStatus, CONTAINER_STATUS_LABELS } from '../../../types';
import { Theme } from '@src/constants/Theme';
import { createStyles } from './Header.styles';

interface NonAssignableBannerProps {
  containerStatus: ContainerStatus;
}

export const NonAssignableBanner: React.FC<NonAssignableBannerProps> = ({ containerStatus }) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const errorBg = colors.status.error + '26';
  const errorBorder = colors.status.error + '4D';

  return (
    <View
      style={[
        styles.nonAssignableBanner,
        { backgroundColor: errorBg, borderColor: errorBorder },
      ]}
    >
      <Ionicons name="lock-closed" size={18} color={colors.status.error} />
      <View style={styles.nonAssignableContent}>
        <Text style={[styles.nonAssignableTitle, { color: colors.status.error }]}>
          Assignation impossible
        </Text>
        <Text style={styles.nonAssignableText}>
          Ce container est en statut "{CONTAINER_STATUS_LABELS[containerStatus]}". {'\n'}
          Les marchandises ne peuvent être assignées qu'aux containers "Réservé" ou "En
          Chargement".
        </Text>
      </View>
    </View>
  );
};
