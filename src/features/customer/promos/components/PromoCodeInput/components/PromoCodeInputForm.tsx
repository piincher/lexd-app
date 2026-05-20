import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { usePromoCodeInputStyles } from "../PromoCodeInput.styles";

interface PromoCodeInputFormProps {
  code: string;
  onChangeCode: (code: string) => void;
  onApply: () => void;
  isPending: boolean;
  errorMessage: string;
  onInputFocus?: () => void;
}

export const PromoCodeInputForm: React.FC<PromoCodeInputFormProps> = ({
  code,
  onChangeCode,
  onApply,
  isPending,
  errorMessage,
  onInputFocus,
}) => {
  const { styles, colors } = usePromoCodeInputStyles();

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Code promo"
          placeholderTextColor={colors.text.disabled}
          value={code}
          onChangeText={onChangeCode}
          autoCapitalize="characters"
          editable={!isPending}
          onFocus={onInputFocus}
        />
        <TouchableOpacity
          style={[
            styles.applyButton,
            (!code.trim() || isPending) && styles.applyButtonDisabled,
          ]}
          onPress={onApply}
          disabled={!code.trim() || isPending}
          activeOpacity={0.8}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={colors.text.inverse} />
          ) : (
            <Text style={styles.applyButtonText}>Appliquer</Text>
          )}
        </TouchableOpacity>
      </View>
      {errorMessage !== "" && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  );
};
