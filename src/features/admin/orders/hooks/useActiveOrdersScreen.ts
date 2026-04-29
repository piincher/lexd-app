import { useEffect, useState } from 'react';
import { useGetRoutes } from '@src/shared/hooks/useRoutes';
import { useCalendar } from '@src/components/Calendar/Calendar';
import { getSafeDate } from '@src/utils/formatDate';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useGetActiveOrdersAdmin } from './useOrderManagement';

const status = [
   { id: '0', title: 'Active' },
   { id: '1', title: 'In Transit' },
   { id: '2', title: 'Delivered' },
];

export const useActiveOrdersScreen = (
   route: RootStackScreenProps<'ActiveOrder'>['route'],
) => {
   const [statusChange, setStatusChange] = useState('Active');
   const [searchQuery, setSearchQuery] = useState('');
   const shippingMethod = route.params.type;

   const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();
   const departDate = getSafeDate(date);

   const {
      data,
      fetchNextPage,
      isError,
      hasNextPage,
      isFetchingNextPage,
      refetch,
      isLoading,
   } = useGetActiveOrdersAdmin(statusChange, departDate!, shippingMethod);

   useGetRoutes();

   const filteredData = data?.pages
      .flatMap((page) => page)
      .filter((item) => {
         return (
            item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.clientPhone.toLowerCase().includes(searchQuery.toLowerCase())
         );
      });

   const loadMore = () => {
      if (hasNextPage) {
         fetchNextPage();
      }
   };

   useEffect(() => {
      refetch();
   }, [statusChange, date]);

   const onStatusChange = (itemValue: string) => {
      setStatusChange(itemValue);
   };

   return {
      statusChange,
      setStatusChange,
      searchQuery,
      setSearchQuery,
      shippingMethod,
      open,
      date,
      onConfirmSingle,
      onDismissSingle,
      setOpen,
      isError,
      hasNextPage,
      isFetchingNextPage,
      refetch,
      isLoading,
      filteredData,
      loadMore,
      onStatusChange,
      status,
   };
};
