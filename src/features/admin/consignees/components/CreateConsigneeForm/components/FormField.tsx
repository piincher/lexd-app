import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, HelperText } from "react-native-paper";
import { useAppTheme } from "@src/providers/ThemeProvider";

interface FormFieldProps {
   label: string;
   required?: boolean;
   value: string;
   onChangeText: (value: string) => void;
   placeholder: string;
   error?: string;
   keyboardType?: "default" | "phone-pad" | "email-address";
   autoCapitalize?: "none" | "sentences" | "words" | "characters";
   multiline?: boolean;
   numberOfLines?: number;
   icon: string;
   inputStyle?: object;
   onInputFocus?: () => void;
}

export const FormField: React.FC<FormFieldProps> = ({
   label,
   required,
   value,
   onChangeText,
   placeholder,
   error,
   keyboardType,
   autoCapitalize,
   multiline,
   numberOfLines,
   icon,
   inputStyle,
   onInputFocus,
}) => {
   const { colors } = useAppTheme();

   return (
      <View style={styles.inputContainer}>
         <Text style={[styles.label, { color: colors.text.secondary }]}>
            {label}{" "}
            {required && <Text style={{ color: colors.status.error }}>*</Text>}
         </Text>
         <TextInput
            mode="outlined"
            value={value}
            onChangeText={onChangeText}
            onFocus={onInputFocus}
            placeholder={placeholder}
            style={[
               styles.input,
               { backgroundColor: colors.background.card },
               inputStyle,
            ]}
            error={!!error}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={numberOfLines}
            outlineColor={colors.border}
            activeOutlineColor={colors.status.success}
            left={<TextInput.Icon icon={icon} />}
         />
         {error && <HelperText type="error">{error}</HelperText>}
      </View>
   );
};

const styles = StyleSheet.create({
   inputContainer: {
      marginBottom: 16,
   },
   label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 8,
   },
   input: {
      height: undefined,
   },
});
