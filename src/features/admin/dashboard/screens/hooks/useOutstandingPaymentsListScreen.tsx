import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useOutstandingPaymentsList } from '../../hooks';

export const useOutstandingPaymentsListScreen = () => {
  const navigation = useNavigation<any>();
  const listData = useOutstandingPaymentsList();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleNotificationPress = useCallback(() => {
    navigation.navigate('Notifications' as never);
  }, [navigation]);

  return {
    ...listData,
    handlers: {
      handleBack,
      handleNotificationPress,
      handleRefresh: listData.handleRefresh,
      handleSearchChange: listData.handleSearchChange,
      handleSearchSubmit: listData.handleSearchSubmit,
      handleClearSearch: listData.handleClearSearch,
      handleStatusChange: listData.handleStatusChange,
      handleNextPage: listData.handleNextPage,
      handlePrevPage: listData.handlePrevPage,
      handleItemPress: listData.handleItemPress,
    },
  };
};
