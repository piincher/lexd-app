import React from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "@src/components/AppButton/AppButton";
import { MultiSelect } from "../../../communications/components/MultiSelect";
import { BatchUpdateStatusPicker } from "../BatchUpdateStatusPicker";
import { BatchUpdateSelectionControls } from "../BatchUpdateSelectionControls";

interface ExtractedItem {
   id?: string;
   name?: string;
   info?: string;
   images?: string;
   currentStatus?: string;
   shippingMode?: string;
   code?: string;
   lastUpdate?: string;
   price?: number;
   packageWeight?: string;
}

interface BatchUpdateContentProps {
   pickerValue: string;
   onValueChange: (value: string) => void;
   onSelectAll: () => void;
   onClear: () => void;
   extractedData?: ExtractedItem[];
   selectedItems: string[];
   onSelectedItemsChange: (items: string[]) => void;
   hasData: boolean;
   onCheckOrders: () => void;
   onNavigateNext: () => void;
}

export const BatchUpdateContent: React.FC<BatchUpdateContentProps> = ({
   pickerValue,
   onValueChange,
   onSelectAll,
   onClear,
   extractedData,
   selectedItems,
   onSelectedItemsChange,
   hasData,
   onCheckOrders,
   onNavigateNext,
}) => {
   return (
      <View style={styles.container}>
         <BatchUpdateStatusPicker
            pickerValue={pickerValue}
            onValueChange={onValueChange}
         />
         <BatchUpdateSelectionControls
            onSelectAll={onSelectAll}
            onClear={onClear}
         />
         <MultiSelect
            items={extractedData || []}
            valueKey="id"
            displayKey="name"
            selectedItems={selectedItems}
            setSelectedItems={onSelectedItemsChange}
         />
         {hasData ? (
            <AppButton onPress={onNavigateNext} title="Suivant" />
         ) : (
            <AppButton onPress={onCheckOrders} title="Obtenir" />
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});
