/**
 * PhoneInput — Unified field with left-pill country selector
 * Hallmark · component: input · genre: modern-minimal
 */

import React, { useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Fonts } from "@src/constants/Fonts";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { CountryCode } from "../types";

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  selectedCountry: CountryCode;
  onSelectCountry: () => void;
  error?: string;
  showCountryPicker: boolean;
  onClear: () => void;
  onSubmit?: () => void;
  onInputFocus?: () => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  selectedCountry,
  onSelectCountry,
  error,
  showCountryPicker,
  onClear,
  onSubmit,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();

  const borderColor = error
    ? colors.status.error
    : colors.border;

  const flagScale = useSharedValue(1);

  useEffect(() => {
    flagScale.value = withSpring(1.3, { damping: 8, stiffness: 200 }, () => {
      flagScale.value = withSpring(1, { damping: 12, stiffness: 150 });
    });
  }, [selectedCountry.code, flagScale]);

  const flagAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flagScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.field,
          {
            borderColor,
            backgroundColor: colors.background.card,
          },
        ]}
      >
        {/* Country selector — left pill */}
        <Pressable
          onPress={onSelectCountry}
          style={[
            styles.countryPill,
            { borderRightColor: colors.border },
          ]}
          hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
        >
          <Animated.Text style={[styles.flag, flagAnimatedStyle]}>
            {selectedCountry.flag}
          </Animated.Text>
          <Text style={[styles.code, { color: colors.text.primary }]}>
            +{selectedCountry.code}
          </Text>
          <MaterialCommunityIcons
            name={showCountryPicker ? "chevron-up" : "chevron-down"}
            size={16}
            color={colors.text.secondary}
          />
        </Pressable>

        {/* Phone input */}
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          placeholder={selectedCountry.placeholder}
          placeholderTextColor={colors.text.disabled}
          value={value}
          onChangeText={(t) => onChangeText(t.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          maxLength={selectedCountry.inputMaxLength || selectedCountry.maxLength}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
          onFocus={onInputFocus}
          selectionColor={colors.primary.main}
        />

        {/* Clear button */}
        {value.length > 0 && (
          <Pressable onPress={onClear} hitSlop={8} style={styles.clearBtn}>
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color={colors.text.disabled}
            />
          </Pressable>
        )}
      </View>

      {/* Error message */}
      {error && (
        <View style={styles.errorRow}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={14}
            color={colors.status.error}
          />
          <Text style={[styles.errorText, { color: colors.status.error }]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 4,
    paddingRight: 14,
  },
  countryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    height: 48,
    borderRightWidth: 1,
  },
  flag: {
    fontSize: 20,
  },
  code: {
    fontSize: 15,
    fontFamily: Fonts.bold,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: Fonts.bold,
    letterSpacing: 1.5,
    paddingVertical: 0,
    paddingLeft: 14,
  },
  clearBtn: {
    marginLeft: 6,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingLeft: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    lineHeight: 16,
  },
});

export default PhoneInput;
