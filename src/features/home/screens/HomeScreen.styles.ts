/* Hallmark · pre-emit critique: P5 H4 E4 S5 R4 V5 */
/* Hallmark · genre: modern-minimal · macrostructure: Route Console · design-system: app theme */
import { StyleSheet } from 'react-native';

type HomeScreenColors = {
  background: {
    paper: string;
  };
};

export const getStyles = (colors: HomeScreenColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.paper,
  },
  scrollContent: {
    paddingBottom: 128,
  },
  bottomSpacing: {
    height: 32,
  },
});
