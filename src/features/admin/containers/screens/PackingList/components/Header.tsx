import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Theme, type ThemeContextType } from '@src/constants/Theme';

interface HeaderProps {
  containerNumber: string;
  clientCount: number;
  totalItems: number;
  totalQuantity: number;
  onBack: () => void;
  onGoToLoadingList: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  containerNumber,
  clientCount,
  totalItems,
  totalQuantity,
  onBack,
  onGoToLoadingList,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const styles = createStyles(colors);
  return (
    <LinearGradient
      colors={[colors.background.card, colors.primary[50]]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={22} color={colors.primary[700]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liste de Colisage</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.loadingListButton} onPress={onGoToLoadingList}>
            <Ionicons name="list" size={20} color={colors.primary[700]} />
          </TouchableOpacity>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color={colors.primary[700]}
          />
        </View>
      </View>
      <Text style={styles.headerSubtitle}>{containerNumber}</Text>
      <View style={styles.metaRail}>
        <MetaPill label="Clients" value={clientCount} colors={colors} />
        <MetaPill label="Colis" value={totalItems} colors={colors} />
        <MetaPill label="Articles" value={totalQuantity} colors={colors} />
      </View>
    </LinearGradient>
  );
};

type AppColors = ThemeContextType['colors'];

const MetaPill = ({ label, value, colors }: { label: string; value: number; colors: AppColors }) => (
  <View style={[stylesStatic.metaPill, { borderColor: colors.primary[100], backgroundColor: colors.background.card }]}>
    <Text style={[stylesStatic.metaValue, { color: colors.primary[700] }]}>{value}</Text>
    <Text style={[stylesStatic.metaLabel, { color: colors.text.secondary }]}>{label}</Text>
  </View>
);

const createStyles = (colors: AppColors) => StyleSheet.create({
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary[100],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIconButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  loadingListButton: {
    width: 44,
    height: 44,
    borderRadius: Theme.radius.full,
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primary[800],
    textAlign: 'center',
    marginTop: Theme.spacing.md,
  },
  metaRail: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.md,
  },
});

const stylesStatic = StyleSheet.create({
  metaPill: {
    flex: 1,
    minHeight: 52,
    borderWidth: 1,
    borderRadius: Theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaValue: { fontSize: 16, fontWeight: '900' },
  metaLabel: {
    marginTop: 1,
    fontSize: 11,
    fontWeight: '700',
  },
});
