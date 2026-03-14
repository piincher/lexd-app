import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@src/components/Header/Header';
import { COLORS } from '@src/constants/Colors';
import { NavigationProp } from '@react-navigation/native';

interface ScreenHeaderProps {
  navigation: NavigationProp<any>;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ navigation }) => {
  return (
    <LinearGradient colors={[COLORS.blue, COLORS.yellow]} style={styles.headerGradient}>
      <Header title="Détails de suivi" navigation={navigation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 5,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.DarkGrey,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
