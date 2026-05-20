import React, { useMemo, useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useFormikContext } from 'formik';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { CountryPickerModal } from '../CountryPickerModal';
import { createStyles } from './AnimatedPhoneInput.styles';

interface Props {
  label: string;
  name: string;
  selectedCode: string;
  setSelectedCode: (code: string) => void;
  code: { label: string; value: string }[];
  maxLength?: number;
  onInputFocus?: () => void;
}

export const AnimatedPhoneInput: React.FC<Props> = ({
  label,
  name,
  selectedCode,
  setSelectedCode,
  code,
  maxLength,
  onInputFocus,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const shakeValue = useSharedValue(0);

  const { handleChange, values, errors, touched, handleBlur } = useFormikContext<{
    [key: string]: string;
  }>();

  const errorMsg = touched[name] && errors[name] ? (errors[name] as string) : '';
  const value = values[name] || '';

  const shakeUI = useCallback(() => {
    shakeValue.value = withSequence(
      withTiming(-10, { duration: 80 }),
      withSpring(0, { damping: 8, mass: 0.5, stiffness: 1000 })
    );
  }, [shakeValue]);

  React.useEffect(() => {
    if (errorMsg) shakeUI();
  }, [errorMsg, shakeUI]);

  const handleFocus = () => {
    setIsFocused(true);
    onInputFocus?.();
  };
  const handleBlurLocal = () => {
    setIsFocused(false);
    handleBlur(name);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeValue.value }],
  }));

  const borderStyle = useMemo(() => {
    if (errorMsg) return styles.inputWrapperError;
    if (isFocused) return styles.inputWrapperFocused;
    return null;
  }, [errorMsg, isFocused, styles]);

  const flag = selectedCode.split('  ')[0];
  const dialCode = selectedCode.split('  ')[1];

  return (
    <>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        </View>
        <View style={[styles.inputWrapper, borderStyle]}>
          <Pressable style={styles.countrySelector} onPress={() => setModalVisible(true)}>
            <Text style={styles.countryFlag}>{flag}</Text>
            <Text style={styles.countryCode}>{dialCode}</Text>
            <Ionicons name="chevron-down" size={16} color={colors.text.secondary} />
          </Pressable>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={handleChange(name)}
            onFocus={handleFocus}
            onBlur={handleBlurLocal}
            keyboardType="number-pad"
            maxLength={maxLength}
            placeholderTextColor={colors.text.disabled}
          />
        </View>
      </Animated.View>

      <CountryPickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(val) => {
          setSelectedCode(val);
          setModalVisible(false);
        }}
        options={code}
        selectedCode={selectedCode}
      />
    </>
  );
};
