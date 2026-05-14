import React from "react";
import { Screen } from "@src/shared/ui/Screen";
import { Calendar } from "@src/components/Calendar/Calendar";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useBatchUpdate, Status } from "../hooks/useBatchUpdate";
import { BatchUpdateDateCard } from "../components/BatchUpdateDateCard";
import { BatchUpdateStatusFilter } from "../components/BatchUpdateStatusFilter";
import { BatchUpdateSelectionBar } from "../components/BatchUpdateSelectionBar";
import { BatchUpdateOrderList } from "../components/BatchUpdateOrderList";
import { BatchUpdateFooter } from "../components/BatchUpdateFooter";

const BatchUpdate = ({ navigation }: RootStackScreenProps<"BatchUpdate">) => {
   const {
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
   } = useBatchUpdate();

   const navigateToNextScreen = () => {
      navigation.navigate("BatchUpdateDetail", { data: selectedItems });
   };

   if (isPending) {
      return <LoadingSpinner />;
   }

   const hasData = (extractedData ?? []).length > 0;

   return (
      <Screen
         header={{
            title: "Mise à jour en lot",
            showBack: true,
            onBackPress: () => navigation.goBack(),
         }}
         footer={
            <BatchUpdateFooter
               hasData={hasData}
               selectedCount={selectedItems.length}
               onCheckOrders={checkfororders}
               onNavigateNext={navigateToNextScreen}
            />
         }
      >
         <Calendar
            open={open}
            onDismissSingle={onDismissSingle}
            date={date}
            onConfirmSingle={onConfirmSingle}
         />
         <BatchUpdateDateCard date={date} onPress={() => setOpen(true)} />
         <BatchUpdateStatusFilter
            options={Status}
            selected={pickerValue}
            onSelect={handleChange}
         />
         <BatchUpdateSelectionBar
            totalCount={extractedData?.length ?? 0}
            selectedCount={selectedItems.length}
            onSelectAll={selectAllItems}
            onClear={clearSelection}
         />
         <BatchUpdateOrderList
            orders={extractedData ?? []}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            hasData={hasData}
         />
      </Screen>
   );
};

export default BatchUpdate;
