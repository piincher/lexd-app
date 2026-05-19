import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./Category.styles";

interface StatusTabProps {
  title: string;
  isActive: boolean;
  icon: string;
  color: string;
  text: string;
  onPress: () => void;
}

export const StatusTab: React.FC<StatusTabProps> = ({
  title,
  isActive,
  icon,
  color,
  text,
  onPress,
}) => {
  const { colors, isDark } = useAppTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.tab,
        isActive && styles.activeTab,
        pressed && styles.pressedTab,
      ]}
      onPress={onPress}
      accessibilityLabel={`Select ${text} status`}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityHint="Switches to the selected status view"
    >
      <View style={styles.tabContent}>
        <MaterialIcons
          name={icon as any}
          size={20}
          color={isActive ? colors.text.inverse : color}
          style={styles.icon}
        />
        <Text
          style={[
            styles.tabText,
            isActive && styles.activeTabText,
            { color: isActive ? colors.text.inverse : color },
          ]}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};
