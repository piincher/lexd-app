import React from "react";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from '@src/providers/ThemeProvider';

export const BackgroundDecoration: React.FC = () => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.backgroundGradient}>
         <View style={[styles.circle1, { backgroundColor: colors.primary.light + "20" }]} />
         <View style={[styles.circle2, { backgroundColor: colors.accent.goldLight + "15" }]} />
      </View>
   );
};

const styles = StyleSheet.create({
   backgroundGradient: {
      ...StyleSheet.absoluteFillObject,
      overflow: "hidden",
   },
   circle1: {
      position: "absolute",
      width: 300,
      height: 300,
      borderRadius: 150,
      top: -100,
      right: -100,
   },
   circle2: {
      position: "absolute",
      width: 250,
      height: 250,
      borderRadius: 125,
      bottom: 100,
      left: -80,
   },
});

export default BackgroundDecoration;
