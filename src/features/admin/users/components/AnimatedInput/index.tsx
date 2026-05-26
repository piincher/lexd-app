import React, { useCallback, useMemo, useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import type { TextInputProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useFormikContext } from 'formik';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { createStyles } from './AnimatedInput.styles';

interface Props extends Omit<TextInputProps, 'style'> {
  label: string;
  name: string;
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: any;
  onInputFocus?: () => void;
}

export const AnimatedInput: React.FC<Props> = ({
  label,
  name,
  icon,
  containerStyle,
  onInputFocus,
  ...inputProps
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const [isFocused, setIsFocused] = useState(false);
  const shakeValue = useSharedValue(0);
  const focusValue = useSharedValue(0);

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
    focusValue.value = withTiming(1, { duration: 200 });
    onInputFocus?.();
  };

  const handleBlurLocal = () => {
    setIsFocused(false);
    focusValue.value = withTiming(0, { duration: 200 });
    handleBlur(name);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeValue.value }],
  }));

  const labelColorStyle = useAnimatedStyle(() => ({
    color: focusValue.value === 1 || value ? colors.primary.main : colors.text.secondary,
  }));

  const borderStyle = useMemo(() => {
    if (errorMsg) return styles.inputWrapperError;
    if (isFocused) return styles.inputWrapperFocused;
    return null;
  }, [errorMsg, isFocused, styles]);

  return (
    <Animated.View style={[styles.container, containerStyle, animatedStyle]}>
      <View style={styles.labelContainer}>
        <Animated.Text style={[styles.label, labelColorStyle]}>{label}</Animated.Text>
        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
      </View>
      <View style={[styles.inputWrapper, borderStyle]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? colors.primary.main : colors.text.disabled}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChange(name)}
          onFocus={handleFocus}
          onBlur={handleBlurLocal}
          placeholderTextColor={colors.text.disabled}
          {...inputProps}
        />
      </View>
    </Animated.View>
  );
};
