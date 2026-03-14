import { useRoute, useNavigation } from '@react-navigation/native';
import { Share } from 'react-native';
import { PublicStackScreenProps } from '@src/navigations/type';

export const useTrackingResult = () => {
  const navigation = useNavigation();
  const route = useRoute<PublicStackScreenProps<'PublicTrackingResult'>['route']>();
  
  const { trackingNumber, data } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Suivez mon envoi ChinaLink Express: ${trackingNumber}`,
        title: 'Suivi ChinaLink Express',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate('Login' as never);
  };

  return {
    trackingNumber,
    data,
    handleShare,
    handleBack,
    handleLogin,
  };
};
