import { useCallback } from "react";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useClipboard } from "@src/shared/lib/hooks/useClipboard";
import { useHomeBannerClick } from "./useHomeBanners";
import type { PromoBanner } from "@src/shared/api/promos";

export const useBannerPress = () => {
  const navigation = useNavigation<any>();
  const { copyToClipboard } = useClipboard();
  const bannerClick = useHomeBannerClick();

  const handleBannerPress = useCallback(
    (banner: PromoBanner) => {
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
    },
    [navigation, copyToClipboard, bannerClick]
  );

  return { handleBannerPress };
};
