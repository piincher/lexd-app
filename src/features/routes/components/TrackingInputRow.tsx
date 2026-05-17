import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useTrackingFormStyles } from './TrackingForm.styles';

interface TrackingInputRowProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onPaste: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  borderColor: string;
}

export const TrackingInputRow: React.FC<TrackingInputRowProps> = ({
  value,
  onChange,
  onClear,
  onPaste,
  onSubmit,
  isSubmitting,
  borderColor,
}) => {
  const { colors } = useAppTheme();
  const styles = useTrackingFormStyles();
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={[styles.row, { borderColor }]}>
      <MaterialCommunityIcons
        name="barcode-scan"
        size={20}
        color={colors.text.secondary}
        style={{ marginRight: 8 }}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="CLEXXXXXXXX"
        placeholderTextColor={colors.text.disabled}
        autoCapitalize="characters"
        autoCorrect={false}
        autoComplete="off"
        returnKeyType="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={onSubmit}
        maxLength={24}
        accessibilityLabel="Numéro de suivi du colis"
        editable={!isSubmitting}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={onClear}
          style={styles.iconButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Effacer"
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={18}
            color={colors.text.disabled}
          />
        </Pressable>
      ) : (
        <Pressable
          onPress={onPaste}
          style={styles.iconButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Coller depuis le presse-papiers"
        >
          <MaterialCommunityIcons
            name="content-paste"
            size={18}
            color={colors.primary.main}
          />
        </Pressable>
      )}
      <Pressable
        onPress={onSubmit}
        disabled={isSubmitting || !value.trim()}
        style={[
          styles.submitButton,
          (isSubmitting || !value.trim()) && styles.submitButtonDisabled,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Rechercher"
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color={colors.text.inverse} />
        ) : (
          <MaterialCommunityIcons
            name="magnify"
            size={22}
            color={colors.text.inverse}
          />
        )}
      </Pressable>
    </View>
  );
};
