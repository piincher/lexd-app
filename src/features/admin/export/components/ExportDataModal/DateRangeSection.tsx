import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { format as formatDate } from "date-fns/format";

import { styles } from "./ExportDataModal.styles";

interface DateRangeSectionProps {
  startDate?: Date;
  endDate?: Date;
  onStartPress: () => void;
  onEndPress: () => void;
}

export const DateRangeSection: React.FC<DateRangeSectionProps> = ({
  startDate,
  endDate,
  onStartPress,
  onEndPress,
}) => (
  <>
    <Text variant="titleMedium" style={styles.sectionTitle}>
      Date Range (Optional)
    </Text>
    <View style={styles.dateContainer}>
      <TouchableOpacity style={styles.dateButton} onPress={onStartPress}>
        <Text variant="bodyMedium">
          {startDate ? formatDate(startDate, "MMM dd, yyyy") : "Start Date"}
        </Text>
      </TouchableOpacity>
      <Text variant="bodyLarge"> to </Text>
      <TouchableOpacity style={styles.dateButton} onPress={onEndPress}>
        <Text variant="bodyMedium">
          {endDate ? formatDate(endDate, "MMM dd, yyyy") : "End Date"}
        </Text>
      </TouchableOpacity>
    </View>
  </>
);
