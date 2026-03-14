import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '@src/constants/Theme';
import { NavigationProp } from '@react-navigation/native';

interface HeaderProps {
  isEditMode: boolean;
  navigation: NavigationProp<any>;
}

export const Header: React.FC<HeaderProps> = ({ isEditMode, navigation }) => {
  return (
    <LinearGradient
      colors={Theme.gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>
          {isEditMode ? 'Modifier la Route' : 'Nouvelle Route'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {isEditMode 
            ? 'Mettez à jour les informations de la route'
            : 'Créez une nouvelle route de transport'
          }
        </Text>
      </View>
      <View style={styles.headerIcon}>
        <Ionicons name="map" size={32} color="rgba(255,255,255,0.3)" />
      </View>
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
    backgroundColor: 'rgba(255,255,255,0.2)',
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
    color: '#FFF',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    marginTop: Theme.spacing.xs,
  },
  headerIcon: {
    opacity: 0.3,
  },
});
