import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@src/constants/Theme';

interface HeaderProps {
  containerNumber: string;
  onBack: () => void;
  onSave: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  containerNumber,
  onBack,
  onSave,
}) => {
  return (
    <LinearGradient
      colors={[Theme.primary[600], Theme.primary[800]]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerTop}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestion Waypoints</Text>
        <TouchableOpacity style={styles.saveIconButton} onPress={onSave}>
          <Ionicons name="save" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerSubtitle}>{containerNumber}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  saveIconButton: {
    padding: 8,
    marginRight: -8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
});
