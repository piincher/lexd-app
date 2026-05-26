import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { NotificationBell } from '@src/shared/ui/NotificationBell';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '@src/constants/Theme';

interface HeaderProps {
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const { colors } = useAppTheme();
  const navigation = useNavigation();
  const styles = createStyles(colors);
  return (
    <LinearGradient 
      colors={Theme.gradients.primary} 
      start={{ x: 0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.header}
    >
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={onBack} 
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={24} color={colors.text.inverse} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Nouveau Container</Text>
        <Text style={styles.headerSubtitle}>
          Créez un container pour regrouper les marchandises
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

const createStyles = (colors: any) => StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)', // Decorative white overlay on colored gradient
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerContent: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.inverse,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.inverse,
    lineHeight: 20,
  },
  headerIcon: {
    position: 'absolute',
    right: 20,
    bottom: 24,
  },
});
