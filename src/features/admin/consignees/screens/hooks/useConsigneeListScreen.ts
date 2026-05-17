import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useConsigneeList } from '../../hooks/useConsigneeList';

type ConsigneeStackParamList = {
  ConsigneeList: undefined;
  ConsigneeDetail: { id: string };
  CreateConsignee: undefined;
};

type NavigationProp = NativeStackNavigationProp<ConsigneeStackParamList>;

export const useConsigneeListScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    searchQuery,
    setSearchQuery,
    filteredConsignees,
    isLoading,
    error,
    refetch,
    handleToggleStatus,
  } = useConsigneeList();

  const handleConsigneePress = useCallback(
    (id: string) => {
      navigation.navigate('ConsigneeDetail', { id });
    },
    [navigation]
  );

  const handleCreatePress = useCallback(() => {
    navigation.navigate('CreateConsignee');
  }, [navigation]);

  return {
    searchQuery,
    setSearchQuery,
    filteredConsignees,
    isLoading,
    error,
    refetch,
    handleToggleStatus,
    handlers: {
      handleConsigneePress,
      handleCreatePress,
    },
  };
};
