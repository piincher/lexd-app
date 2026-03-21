import { COLORS } from "@src/constants/Colors";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View, Image, TouchableOpacity, Linking } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useClipboard } from "@src/hooks/useClipBoard";
import { useActiveBanners, useBannerClick } from "@src/features/customer/promos/hooks";
import type { PromoBanner } from "@src/features/customer/promos/api";

const { width } = Dimensions.get("window");

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
      // Track the click
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
      return <ActivityIndicator size="large" color={COLORS.blue} />;
   }

   return (
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={styles.container}>
            <View style={styles.swiper}>
               <SwiperFlatList
                  autoplay
                  autoplayDelay={5}
                  autoplayLoop
                  index={0}
                  showPagination
                  paginationStyleItemActive={{ backgroundColor: COLORS.blue, marginTop: 10 }}
                  paginationStyleItemInactive={{ backgroundColor: COLORS.grey, marginTop: 10 }}
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
                              style={styles.imageContainer}
                           />
                        </TouchableOpacity>
                     ))
                     : fallbackBanner.map((item) => (
                        <React.Fragment key={item}>
                           <Image key={item} source={{ uri: item }} style={styles.imageContainer} />
                        </React.Fragment>
                     ))}
               </SwiperFlatList>
               <View style={{ height: 20 }} />
            </View>
         </View>
      </ScrollView>
   );
};
const styles = StyleSheet.create({
   container: {
      //backgroundColor: "gainsboro",
      alignItems: "center",
      justifyContent: "center",
   },
   swiper: {
      width,
      alignItems: "center",
      marginTop: 20,
   },
   imageContainer: {
      height: width,
      width: width - 40,
      borderRadius: 10,
      marginHorizontal: 20,
   },
});
export default Banner;
