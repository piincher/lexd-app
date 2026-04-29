/**
 * AboutUs Screen
 * SRP: About page composition only
 */

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useAboutUs } from '@src/features/profile/hooks/useAboutUs';
import { AboutUsHero } from '@src/features/profile/components/AboutUsHero';
import { AboutUsStats } from '@src/features/profile/components/AboutUsStats';
import { AboutUsWarehouseImage } from '@src/features/profile/components/AboutUsWarehouseImage';
import { AboutUsMissionCard } from '@src/features/profile/components/AboutUsMissionCard';
import { AboutUsVisionCard } from '@src/features/profile/components/AboutUsVisionCard';
import { AboutUsValuesGrid } from '@src/features/profile/components/AboutUsValuesGrid';
import { AboutUsServicesCard } from '@src/features/profile/components/AboutUsServicesCard';
import { AboutUsContactCard } from '@src/features/profile/components/AboutUsContactCard';
import { AboutUsFooter } from '@src/features/profile/components/AboutUsFooter';

const AboutUs = () => {
   const { colors } = useAppTheme();
   const { handleCall, handleWebsite } = useAboutUs();

   return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background.default }]}>
         <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <AboutUsHero />
            <AboutUsStats />
            <AboutUsWarehouseImage />
            <AboutUsMissionCard />
            <AboutUsVisionCard />
            <AboutUsValuesGrid />
            <AboutUsServicesCard />
            <AboutUsContactCard onCall={handleCall} />
            <AboutUsFooter onCall={handleCall} onWebsite={handleWebsite} />
         </ScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   scrollContent: {
      flexGrow: 1,
      paddingBottom: 40,
   },
});

export default AboutUs;
