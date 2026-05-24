import { useAppTheme } from '@src/providers/ThemeProvider';
import React, { useEffect, useState } from 'react';
import {
   View,
   Image,
} from 'react-native';
import { ShimmerBlock } from '@src/shared/ui';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useHomeBanners } from '../hooks/useHomeBanners';
import { useBannerPress } from '../hooks/useBannerPress';
import { BannerSlide } from './BannerSlide';
import { createStyles, BANNER_WIDTH, BANNER_HEIGHT } from './Banner.styles';

const FALLBACK_IMAGES = [
   'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/1.png',
   'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/2.png',
   'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/3.png',
];

const Banner = () => {
   const [fallbackBanner, setFallbackBanner] = useState<string[]>([]);
   const [fallbackLoading, setFallbackLoading] = useState<boolean>(true);
   const { colors } = useAppTheme();

   const { data: banners, isLoading: bannersLoading, isError } = useHomeBanners();
   const { handleBannerPress } = useBannerPress();

   const hasDynamicBanners = !isError && banners && banners.length > 0;

   useEffect(() => {
      if (!hasDynamicBanners) {
         setFallbackLoading(true);
         setFallbackBanner(FALLBACK_IMAGES);
         setFallbackLoading(false);
      }
      return () => {
         setFallbackBanner([]);
      };
   }, [hasDynamicBanners]);

   const isLoading = hasDynamicBanners ? bannersLoading : fallbackLoading;
   const styles = createStyles(colors);

   if (isLoading) {
      return (
         <View style={styles.container}>
            <ShimmerBlock width={BANNER_WIDTH} height={BANNER_HEIGHT} borderRadius={16} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <SwiperFlatList
            index={0}
            showPagination
            paginationStyleItemActive={styles.paginationActive}
            paginationStyleItemInactive={styles.paginationInactive}
            paginationStyleItem={styles.paginationDot}
         >
            {hasDynamicBanners
               ? banners.map((banner) => (
                    <BannerSlide key={banner.bannerId} banner={banner} onPress={handleBannerPress} />
                 ))
               : fallbackBanner.map((item) => (
                    <Image key={item} source={{ uri: item }} style={styles.bannerImage} />
                 ))}
         </SwiperFlatList>
      </View>
   );
};

export default Banner;
