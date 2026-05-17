import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Item } from "./MultiSelect";

interface MultiSelectItemProps {
  item: Item;
  isSelected: boolean;
  displayKey: keyof Item;
  imageKey: keyof Item;
  statusKey: keyof Item;
  dateKey: keyof Item;
  weightKey: keyof Item;
  styles: ReturnType<typeof import("./MultiSelect.styles").getStyles>;
  onPress: () => void;
  otherProps: any;
}

export const MultiSelectItem: React.FC<MultiSelectItemProps> = ({
  item,
  isSelected,
  displayKey,
  imageKey,
  statusKey,
  dateKey,
  weightKey,
  styles,
  onPress,
  otherProps,
}) => {
  const lastUpdate = item[dateKey] ? new Date(item[dateKey] as string) : null;

  return (
    <Pressable
      onPress={onPress}
      {...otherProps}
      style={[styles.card, isSelected ? styles.selectedCard : styles.notSelectedCard]}
    >
      {item[imageKey] ? (
        <Image source={{ uri: item[imageKey] as string }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{String(item[displayKey])}</Text>
        <Text style={styles.cardSubtitle}>Numero de telephone: {item.info}</Text>
        <Text style={styles.cardSubtitle}>Current Status : {item[statusKey]}</Text>
        <Text style={styles.cardSubtitle}>
          Date : {lastUpdate ? lastUpdate.toLocaleDateString() : "N/A"}
        </Text>
        <Text style={styles.cardSubtitle}>CBM : {item[weightKey]}</Text>
      </View>

      <View
        style={[
          styles.indicator,
          isSelected ? styles.selectedIndicator : styles.notSelectedIndicator,
        ]}
      />
    </Pressable>
  );
};
