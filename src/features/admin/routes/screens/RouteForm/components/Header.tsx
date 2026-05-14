import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import type { NavigationProp } from '@react-navigation/native';

interface HeaderProps {
  isEditMode: boolean;
  navigation: NavigationProp<any>;
}

export const Header: React.FC<HeaderProps> = ({ isEditMode, navigation }) => {
  const { colors } = useAppTheme();
  return (
    <LinearGradient
      colors={Theme.gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.primary.dark }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={[styles.headerTitle, { color: colors.text.inverse }]}>
          {isEditMode ? 'Modifier la Route' : 'Nouvelle Route'}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.inverse, opacity: 0.8 }]}>
          {isEditMode 
            ? 'Mettez à jour les informations de la route'
            : 'Créez une nouvelle route de transport'
          }
        </Text>
      </View>
      <NotificationBell
        onPress={() => navigation.navigate('Notifications' as never)}
        size={24}
        color={colors.text.inverse}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.xl,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing['2xl'],
    borderBottomLeftRadius: Theme.radius['3xl'],
    borderBottomRightRadius: Theme.radius['3xl'],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    marginLeft: Theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: Theme.spacing.xs,
  },
  headerIcon: {
    opacity: 0.3,
  },
});
