import React from "react";
import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./SearchBar.styles";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  isDebouncing?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onVoiceSearch?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Rechercher...",
  isDebouncing = false,
  onFocus,
  onBlur,
  onVoiceSearch,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name="search" size={20} color={colors.text.secondary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text.disabled}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          accessibilityRole="search"
          accessibilityLabel="Rechercher des clients"
        />
        {isDebouncing ? (
          <ActivityIndicator size="small" color={colors.primary.main} style={styles.loader} />
        ) : value ? (
          <TouchableOpacity onPress={() => onChangeText("")} style={styles.clearButton} accessibilityRole="button" accessibilityLabel="Effacer la recherche">
            <View style={styles.clearBadge}>
              <Ionicons name="close" size={14} color={colors.text.inverse} />
            </View>
          </TouchableOpacity>
        ) : onVoiceSearch ? (
          <TouchableOpacity onPress={onVoiceSearch} style={styles.voiceButton} accessibilityRole="button" accessibilityLabel="Recherche vocale">
            <Ionicons name="mic" size={18} color={colors.primary.main} />
          </TouchableOpacity>
        ) : null}
      </View>
    </Animated.View>
  );
};
