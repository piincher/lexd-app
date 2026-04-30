import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Fonts } from '@src/constants/Fonts';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AuditHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  onRefresh?: () => void;
}

export const AuditHeader: React.FC<AuditHeaderProps> = ({ title, subtitle, onBack, onRefresh }) => {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background.card, borderBottomColor: colors.border }]}>
      <Pressable accessibilityRole="button" style={styles.iconButton} onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
      </Pressable>
      <View style={styles.titleWrap}>
        <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={1}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, { color: colors.text.secondary }]} numberOfLines={1}>{subtitle}</Text> : null}
      </View>
      {onRefresh ? (
        <Pressable accessibilityRole="button" style={styles.iconButton} onPress={onRefresh}>
          <MaterialCommunityIcons name="refresh" size={22} color={colors.primary.main} />
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    minHeight: 64,
    paddingHorizontal: 12,
  },
  iconButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
});
