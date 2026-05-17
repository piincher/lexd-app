import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SummaryHeaderProps {
  containerNumber?: string;
  status?: string;
  statusBg: string;
  statusTextColor: string;
}

export const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  containerNumber,
  status,
  statusBg,
  statusTextColor,
}) => {
  const theme = useTheme();
  const { colors } = useAppTheme();

  return (
    <View style={styles.header}>
      <View style={styles.containerInfo}>
        <MaterialCommunityIcons
          name="package-variant-closed"
          size={24}
          color={theme.colors.primary}
        />
        <View style={styles.containerTextContainer}>
          <Text style={[styles.containerLabel, { color: colors.status.success }]}>
            Container
          </Text>
          <Text style={[styles.containerNumber, { color: colors.text.secondary }]}>
            {containerNumber || 'N/A'}
          </Text>
        </View>
      </View>
      {status && (
        <Chip
          style={[styles.statusChip, { backgroundColor: statusBg }]}
          textStyle={[styles.statusText, { color: statusTextColor }]}
        >
          {status}
        </Chip>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  containerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  containerTextContainer: {
    marginLeft: 12,
  },
  containerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
  },
  containerNumber: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    marginTop: 2,
  },
  statusChip: {
    borderRadius: 16,
  },
  statusText: {
    fontFamily: Fonts.meduim,
    fontSize: 12,
  },
});
