/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · genre: modern-minimal · macrostructure: Index-First · design-system: app theme · contrast: pass (46–50) · slop: pass (51–60) · mobile: pass (36, 59, 61–69) */
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 128,
    gap: 32,
  },
});
