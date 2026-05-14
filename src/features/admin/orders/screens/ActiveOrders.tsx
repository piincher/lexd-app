import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@src/components/Header/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Calendar } from '@src/components/Calendar/Calendar';
import { ListItemOrders } from '@src/components/ListItemOrders';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Category } from '../components/Category';
import { useActiveOrdersScreen } from '../hooks/useActiveOrdersScreen';
import { ActiveOrdersSearchBar } from '../components/ActiveOrdersSearchBar';
import { ActiveOrdersErrorState } from '../components/ActiveOrdersErrorState';

const ActiveOrders = ({ navigation, route }: RootStackScreenProps<'ActiveOrder'>) => {
   const { colors } = useAppTheme();
   const {
      statusChange,
      setStatusChange,
      searchQuery,
      setSearchQuery,
      open,
      date,
      onConfirmSingle,
      onDismissSingle,
      setOpen,
      isError,
      refetch,
      filteredData,
      loadMore,
      isFetchingNextPage,
      hasNextPage,
      isLoading,
      onStatusChange,
      status,
   } = useActiveOrdersScreen(route);

   if (isError) {
      return (
         <View style={styles.container}>
            <ActiveOrdersErrorState onRetry={refetch} />
         </View>
      );
   }

   return (
      <SafeAreaView style={styles.container}>
         <Header
            title="Commandes"
            navigation={navigation}
            rightIcon={<AntDesign name="calendar" size={24} color={colors.text.primary} />}
            rightIconHandler={() => setOpen(true)}
         />
         <Calendar
            open={open}
            onDismissSingle={onDismissSingle}
            date={date}
            onConfirmSingle={onConfirmSingle}
         />
         <Category
            status={status}
            onStatusChange={onStatusChange}
            statusChange={statusChange}
            setStatusChange={setStatusChange}
         />
         <ActiveOrdersSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
         />
         <ListItemOrders
            data={filteredData}
            loadMore={loadMore}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default ActiveOrders;
