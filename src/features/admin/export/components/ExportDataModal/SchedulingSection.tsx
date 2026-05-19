import React from "react";
import { View } from "react-native";
import { Text, Checkbox, RadioButton } from "react-native-paper";

import { ScheduleFrequency } from "../../types";
import { SCHEDULE_FREQUENCIES } from "./exportModalConstants";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./ExportDataModal.styles";

interface SchedulingSectionProps {
  isScheduled: boolean;
  onToggle: () => void;
  frequency: ScheduleFrequency;
  onFrequencyChange: (frequency: ScheduleFrequency) => void;
}

export const SchedulingSection: React.FC<SchedulingSectionProps> = ({
  isScheduled,
  onToggle,
  frequency,
  onFrequencyChange,
}) => {
  const { colors } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);

  return (
    <>
      <View style={styles.checkboxRow}>
        <Checkbox
          status={isScheduled ? "checked" : "unchecked"}
          onPress={onToggle}
        />
        <Text variant="bodyMedium">Schedule recurring export</Text>
      </View>

      {isScheduled && (
        <RadioButton.Group
          onValueChange={(value) => onFrequencyChange(value as ScheduleFrequency)}
          value={frequency}
        >
          {SCHEDULE_FREQUENCIES.map((f) => (
            <RadioButton.Item
              key={f.value}
              label={f.label}
              value={f.value}
              position="leading"
            />
          ))}
        </RadioButton.Group>
      )}
    </>
  );
};
