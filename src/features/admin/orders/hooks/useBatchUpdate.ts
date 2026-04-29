import { useEffect, useMemo, useState, useCallback } from "react";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useCalendar } from "@src/components/Calendar/Calendar";
import { useMutateBetweenDate } from "./useOrderManagement";

export const Status = [
   {
      id: "1",
      title: "Active",
   },
   {
      id: "3",
      title: "In Transit",
   },
   {
      id: "4",
      title: "Delivered",
   },
];

export const useBatchUpdate = () => {
   const { colors, isDark } = useAppTheme();
   const { open, date, onConfirmSingle, onDismissSingle, setOpen } = useCalendar();
   const [pickerValue, setPickerValue] = useState(Status[0].title);
   const [selectedItems, setSelectedItems] = useState<string[]>([]);
   const { mutate, data, isPending, reset } = useMutateBetweenDate();

   const startDate = useMemo(() => {
      return new Date(
         date?.getFullYear() ?? 1970,
         date?.getMonth() ?? 0,
         date?.getDate() + 1 ?? 1
      );
   }, [date]);

   useEffect(() => {
      if (open) {
         reset();
      }
   }, [open, reset]);

   const extractedData = useMemo(() => {
      return data?.map((item) => ({
         id: item._id,
         name: item?.clientName,
         info: item?.clientPhone,
         images: item?.images[0]?.url,
         currentStatus: item?.currentStatus,
         shippingMode: item?.shippingMode,
         code: item?.code,
         lastUpdate: item?.updatedAt,
         price: item?.priceTotal,
         packageWeight: item?.packageCBM,
      }));
   }, [data]);

   const checkfororders = useCallback(() => {
      mutate({
         departureDate: startDate,
         status: pickerValue,
      });
   }, [mutate, startDate, pickerValue]);

   const selectAllItems = useCallback(() => {
      if (extractedData) {
         const allIds = extractedData
            .map((item) => item.id)
            .filter((id): id is string => typeof id === "string");
         setSelectedItems(allIds);
      }
   }, [extractedData]);

   const clearSelection = useCallback(() => {
      setSelectedItems([]);
   }, []);

   const handleChange = useCallback((value: string) => {
      setPickerValue(value);
   }, []);

   return {
      colors,
      isDark,
      open,
      date,
      onConfirmSingle,
      onDismissSingle,
      setOpen,
      pickerValue,
      selectedItems,
      setSelectedItems,
      isPending,
      extractedData,
      checkfororders,
      selectAllItems,
      clearSelection,
      handleChange,
   };
};
