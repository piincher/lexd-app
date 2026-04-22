import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/features/notifications';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#D97706', '#B45309']}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backIconButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan de Chargement</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <TouchableOpacity style={styles.backIconButton} onPress={onNavigateToPackingList}>
            <Ionicons name="document-text" size={20} color="#FFF" />
          </TouchableOpacity>
          <NotificationBell
            onPress={() => navigation.navigate('Notifications' as never)}
            size={22}
            color="#FFF"
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
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
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
