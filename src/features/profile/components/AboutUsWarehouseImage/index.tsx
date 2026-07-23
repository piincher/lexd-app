import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@src/constants/Fonts';
import { HAIRLINE, RADIUS } from '@src/shared/ui/designLanguage';
import { useAppTheme } from '@src/providers/ThemeProvider';

export const AboutUsWarehouseImage: React.FC = () => {
   const { colors } = useAppTheme();
   const styles = makeStyles(colors);

   return (
      <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.imageCard}>
         <Image
            source={{
               uri: 'https://lexd.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse.jpeg',
            }}
            style={styles.warehouseImage}
            resizeMode="cover"
         />
         <LinearGradient
            colors={['transparent', colors.background.overlay]}
            style={styles.imageOverlay}
         >
            <Text style={styles.imageCaption}>Centre logistique - Foshan, GuangDong</Text>
         </LinearGradient>
      </Animated.View>
   );
};

const makeStyles = (colors: any) =>
   StyleSheet.create({
      imageCard: {
         marginHorizontal: 20,
         marginTop: 16,
         borderRadius: RADIUS.card,
         overflow: 'hidden',
         height: 180,
         borderWidth: HAIRLINE,
         borderColor: colors.border,
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
         color: colors.text.inverse,
      },
   });
