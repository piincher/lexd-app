import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface SummaryHeaderProps {
  containerNumber?: string;
  status?: string;
  statusLabel?: string;
  statusBg: string;
  statusTextColor: string;
}

export const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  containerNumber,
  status,
  statusLabel,
  statusBg,
  statusTextColor,
}) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.header}>
      <View style={styles.containerInfo}>
        <View style={[styles.iconWrap, { backgroundColor: colors.primary[50] }]}>
          <MaterialCommunityIcons
            name="package-variant-closed"
            size={22}
            color={colors.primary[600]}
          />
        </View>
        <View style={styles.containerTextContainer}>
          <Text style={[styles.containerLabel, { color: colors.text.muted }]}>
            Container
          </Text>
          <Text style={[styles.containerNumber, { color: colors.text.primary }]}>
            {containerNumber || 'N/A'}
          </Text>
        </View>
      </View>
      {status && (
        <Chip
          style={[styles.statusChip, { backgroundColor: statusBg }]}
          textStyle={[styles.statusText, { color: statusTextColor }]}
        >
          {statusLabel || status}
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
    marginBottom: 16,
  },
  containerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  containerTextContainer: {
    flex: 1,
  },
  containerLabel: {
    fontFamily: Fonts.regular,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  containerNumber: {
    fontFamily: Fonts.black,
    fontSize: 20,
    marginTop: 2,
  },
  statusChip: {
    borderRadius: 10,
    height: 32,
    justifyContent: 'center',
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
