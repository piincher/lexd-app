import React, { useMemo } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@src/constants/Fonts';
import { Theme } from '@src/constants/Theme';

export const AboutUsWarehouseImage: React.FC = () => {
   const styles = useMemo(() => makeStyles(), []);

   return (
      <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.imageCard}>
         <Image
            source={{
               uri: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse.jpeg',
            }}
            style={styles.warehouseImage}
            resizeMode="cover"
         />
         <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.imageOverlay}
         >
            <Text style={styles.imageCaption}>Centre logistique - Foshan, GuangDong</Text>
         </LinearGradient>
      </Animated.View>
   );
};

const makeStyles = () =>
   StyleSheet.create({
      imageCard: {
         marginHorizontal: 20,
         marginTop: 16,
         borderRadius: 16,
         overflow: 'hidden',
         height: 180,
         ...Theme.shadows.sm,
      },
      warehouseImage: {
         width: '100%',
         height: '100%',
      },
      imageOverlay: {
         ...StyleSheet.absoluteFillObject,
         justifyContent: 'flex-end',
         padding: 16,
      },
      imageCaption: {
         fontSize: 12,
         fontFamily: Fonts.medium,
         color: 'rgba(255,255,255,0.9)',
      },
   });
