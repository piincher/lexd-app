import { COLORS } from "@src/constants/Colors";
import React, { useEffect, useState } from "react";
import {
   ActivityIndicator,
   Dimensions,
   StyleSheet,
   View,
   Image,
   TouchableOpacity,
   Linking,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useClipboard } from "@src/hooks/useClipBoard";
import { useActiveBanners, useBannerClick } from "@src/features/customer/promos/hooks";
import type { PromoBanner } from "@src/features/customer/promos/api";

const { width } = Dimensions.get("window");
const BANNER_WIDTH = width - 32;
const BANNER_HEIGHT = BANNER_WIDTH * 0.55;

const FALLBACK_IMAGES = [
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/1.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/2.png",
   "https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/3.png",
];

const Banner = () => {
   const [fallbackBanner, setFallbackBanner] = useState<string[]>([]);
   const [fallbackLoading, setFallbackLoading] = useState<boolean>(true);
   const navigation = useNavigation<any>();
   const { copyToClipboard } = useClipboard();

   const { data: banners, isLoading: bannersLoading, isError } = useActiveBanners();
   const bannerClick = useBannerClick();

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

   const handleBannerPress = (banner: PromoBanner) => {
      bannerClick.mutate(banner.bannerId);

      switch (banner.linkType) {
         case "PROMO_CODE":
            if (banner.promoCodeId?.code) {
               copyToClipboard(banner.promoCodeId.code);
               showMessage({
                  message: "Code copié !",
                  description: banner.promoCodeId.code,
                  type: "success",
                  duration: 2000,
               });
            }
            break;
         case "EXTERNAL":
            if (banner.externalUrl) {
               Linking.openURL(banner.externalUrl);
            }
            break;
         case "SCREEN":
            if (banner.screenName) {
               navigation.navigate(banner.screenName);
            }
            break;
         case "NONE":
         default:
            break;
      }
   };

   const isLoading = hasDynamicBanners ? bannersLoading : fallbackLoading;

   if (isLoading) {
      return (
         <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <SwiperFlatList
            autoplay
            autoplayDelay={5}
            autoplayLoop
            index={0}
            showPagination
            paginationStyleItemActive={styles.paginationActive}
            paginationStyleItemInactive={styles.paginationInactive}
            paginationStyleItem={styles.paginationDot}
         >
            {hasDynamicBanners
               ? banners.map((banner) => (
                    <TouchableOpacity
                       key={banner.bannerId}
                       activeOpacity={banner.linkType === "NONE" ? 1 : 0.8}
                       onPress={() => handleBannerPress(banner)}
                    >
                       <Image
                          source={{ uri: banner.imageUrl }}
                          style={styles.bannerImage}
                       />
                    </TouchableOpacity>
                 ))
               : fallbackBanner.map((item) => (
                    <Image key={item} source={{ uri: item }} style={styles.bannerImage} />
                 ))}
         </SwiperFlatList>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      marginTop: 16,
      marginBottom: 8,
      alignItems: "center",
   },
   loadingContainer: {
      height: BANNER_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
   },
   bannerImage: {
      width: BANNER_WIDTH,
      height: BANNER_HEIGHT,
      borderRadius: 16,
      marginHorizontal: 16,
   },
   paginationActive: {
      backgroundColor: COLORS.blue,
   },
   paginationInactive: {
      backgroundColor: COLORS.grey,
   },
   paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      marginTop: 12,
   },
});

export default Banner;
