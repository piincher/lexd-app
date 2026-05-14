import React from "react";
import { Screen } from "@src/shared/ui/Screen";
import { AntDesign } from "@expo/vector-icons";
import { Calendar } from "@src/components/Calendar/Calendar";
import { LoadingSpinner } from "@src/components/LoadingSpinner";
import type { RootStackScreenProps } from "@src/navigations/type";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { useBatchUpdate } from "../hooks/useBatchUpdate";
import { BatchUpdateContent } from "../components/BatchUpdateContent";

const BatchUpdate = ({ navigation }: RootStackScreenProps<"BatchUpdate">) => {
   const { colors } = useAppTheme();
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

   return (
      <Screen
         header={{
            title: "Batch Update Orders",
            showBack: true,
            onBackPress: () => navigation.goBack(),
            rightAction: (
               <AntDesign name="calendar" size={24} color={colors.text.primary} onPress={() => setOpen(true)} />
            ),
         }}
      >
         <Calendar
            open={open}
            onDismissSingle={onDismissSingle}
            date={date}
            onConfirmSingle={onConfirmSingle}
         />
         <BatchUpdateContent
            pickerValue={pickerValue}
            onValueChange={handleChange}
            onSelectAll={selectAllItems}
            onClear={clearSelection}
            extractedData={extractedData}
            selectedItems={selectedItems}
            onSelectedItemsChange={setSelectedItems}
            hasData={(extractedData ?? []).length > 0}
            onCheckOrders={checkfororders}
            onNavigateNext={navigateToNextScreen}
         />
      </Screen>
   );
};

export default BatchUpdate;
