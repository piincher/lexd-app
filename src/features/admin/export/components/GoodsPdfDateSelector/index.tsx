import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns/format";
import { createStyles } from './GoodsPdfDateSelector.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface GoodsPdfDateSelectorProps {
  start: string | null;
  end: string | null;
  onOpenPicker: () => void;
  onClear: () => void;
}

export const GoodsPdfDateSelector: React.FC<GoodsPdfDateSelectorProps> = ({
  start,
  end,
  onOpenPicker,
  onClear,
}) => {
  const fmt = (d: string) => format(new Date(d), "dd/MM/yyyy");

  const { colors, isDark } = useAppTheme();

  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <View>
      <Text style={styles.label}>Période d'export</Text>
      {start && end ? (
        <Chip icon="calendar" onClose={onClear} style={styles.chip}>
          {fmt(start)} - {fmt(end)}
        </Chip>
      ) : (
        <TouchableOpacity style={styles.dateBtn} onPress={onOpenPicker}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={colors.primary[500]}
          />
          <Text style={styles.dateBtnText}>Choisir une période</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
