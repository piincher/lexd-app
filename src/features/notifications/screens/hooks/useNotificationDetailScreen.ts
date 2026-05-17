import { useRoute, useNavigation } from '@react-navigation/native';
import type { InAppNotification } from '../../types';
import type { navigationProps } from '@src/navigations/type';
import { useNotificationDetail } from '../../hooks/useNotificationDetail';

interface RouteParams {
  notification: InAppNotification;
}

export const useNotificationDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<navigationProps>();
  const { notification } = route.params as RouteParams;

  const {
    createdAt,
    showActionButton,
    handleActionPress,
    handleDelete,
  } = useNotificationDetail(notification, navigation);

  return {
    notification,
    createdAt,
    showActionButton,
    handlers: {
      handleActionPress,
      handleDelete,
    },
  };
};
