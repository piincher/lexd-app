import React, { useMemo } from "react";
import { FlashList } from "@shopify/flash-list";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { getStyles } from "./MultiSelect.styles";
import { MultiSelectItem } from "./MultiSelectItem";
import { MultiSelectEmpty } from "./MultiSelectEmpty";

export interface Item {
  id: string;
  name: string;
  info?: string;
  currentStatus?: string;
  lastUpdate?: string;
  packageWeight?: string;
  images?: string;
}

interface MultiSelectProps {
  items: Item[];
  valueKey?: keyof Item;
  displayKey?: keyof Item;
  imageKey?: keyof Item;
  statusKey?: keyof Item;
  dateKey?: keyof Item;
  weightKey?: keyof Item;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function MultiSelect(props: MultiSelectProps): React.ReactElement {
  const {
    items,
    valueKey = "id",
    displayKey = "name",
    imageKey = "images",
    statusKey = "currentStatus",
    dateKey = "lastUpdate",
    weightKey = "packageWeight",
    selectedItems,
    setSelectedItems,
    ...otherprops
  } = props;

  const { colors } = useAppTheme();
  const styles = useMemo(() => getStyles(colors), [colors]);

  const handleSelect = (item: Item) => {
    setSelectedItems((prev) => {
      const itemId = item[valueKey] as string;
      if (prev.includes(itemId)) {
        return prev.filter((i) => i !== itemId);
      }
      return [...prev, itemId];
    });
  };

  return (
    <FlashList
      data={items}
      ListEmptyComponent={<MultiSelectEmpty styles={styles} />}
      keyExtractor={(item) => item[valueKey] as string}
      renderItem={({ item }) => {
        const isSelected = selectedItems.includes(item[valueKey] as string);
        return (
          <MultiSelectItem
            item={item}
            isSelected={isSelected}
            displayKey={displayKey}
            imageKey={imageKey}
            statusKey={statusKey}
            dateKey={dateKey}
            weightKey={weightKey}
            styles={styles}
            onPress={() => handleSelect(item)}
            otherProps={otherprops}
          />
        );
      }}
    />
  );
}

export default MultiSelect;
