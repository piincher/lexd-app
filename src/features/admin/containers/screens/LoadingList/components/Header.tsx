import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';

interface HeaderProps {
  containerNumber: string;
  itemCount: number;
  onBack: () => void;
  onNavigateToPackingList: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  containerNumber,
  itemCount,
  onBack,
  onNavigateToPackingList,
}) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[Theme.colors.status.warning, Theme.colors.status.error]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={Theme.colors.text.inverse} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan de Chargement</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity style={styles.backIconButton} onPress={onNavigateToPackingList}>
            <Ionicons name="document-text" size={20} color={Theme.colors.text.inverse} />
          </TouchableOpacity>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color={Theme.colors.text.inverse}
          />
        </View>
      </View>
      <Text style={styles.headerSubtitle}>{containerNumber}</Text>
      <Text style={styles.headerMeta}>{itemCount} articles • Ordre: Poids décroissant</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
    paddingHorizontal: Theme.spacing.lg,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Theme.colors.text.inverse,
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Theme.colors.text.inverse,
    textAlign: 'center',
    marginTop: Theme.spacing.md,
  },
  headerMeta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: Theme.spacing.xs,
  },
});
