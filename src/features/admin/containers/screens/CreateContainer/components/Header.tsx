import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';
import { NotificationBell } from '@src/features/notifications';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const navigation = useNavigation();
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
        <Ionicons name="arrow-back" size={24} color="#FFF" />
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
        color="#FFF"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  headerIcon: {
    position: 'absolute',
    right: 20,
    bottom: 24,
  },
});
