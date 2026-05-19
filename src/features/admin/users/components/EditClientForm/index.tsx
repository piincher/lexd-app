import React from "react";
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import type { AnyObjectSchema } from "yup";
import { useFormikContext } from "formik";

import Form from "@src/components/Form/Form";
import { AnimatedInput } from "../AnimatedInput";
import { AnimatedPhoneInput } from "../AnimatedPhoneInput";
import { SubmitGradientButton } from "../SubmitGradientButton";
import { useAppTheme } from "@src/providers/ThemeProvider";
import { createStyles } from "./EditClientForm.styles";
import type { EditClientFormValues } from "../../hooks/useEditClient";

interface EditClientFormProps {
  initialValues: EditClientFormValues;
  onSubmit: (values: EditClientFormValues) => void;
  validationSchema: AnyObjectSchema;
  selectedCode: string;
  setSelectedCode: (code: string) => void;
  isPending: boolean;
  isLoadingUser: boolean;
  phoneMaxLength: number;
  signUpDataCode: { label: string; value: string }[];
  roleOptions: { value: string; label: string }[];
}

const RoleSelector: React.FC<{ options: { value: string; label: string }[] }> = ({ options }) => {
  const { values, setFieldValue } = useFormikContext<EditClientFormValues>();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <View>
      <Text style={styles.roleLabel}>Rôle</Text>
      <View style={styles.roleRow}>
        {options.map((opt) => {
          const isActive = values.role === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.roleChip, isActive && styles.roleChipActive]}
              onPress={() => setFieldValue("role", opt.value)}
              activeOpacity={0.7}
            >
              <Text style={[styles.roleChipText, isActive && styles.roleChipTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const EditClientForm: React.FC<EditClientFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  selectedCode,
  setSelectedCode,
  isPending,
  isLoadingUser,
  phoneMaxLength,
  signUpDataCode,
  roleOptions,
}) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);

  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Animated.View entering={FadeInUp.delay(100).duration(500).springify()}>
            <AnimatedInput
              label="Prénom"
              name="firstName"
              icon="person-outline"
              autoCapitalize="words"
              placeholder="Entrez le prénom"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200).duration(500).springify()}>
            <AnimatedInput
              label="Nom"
              name="lastName"
              icon="person-outline"
              autoCapitalize="words"
              placeholder="Entrez le nom"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300).duration(500).springify()}>
            <AnimatedPhoneInput
              label="Numéro de téléphone"
              name="phoneNumber"
              selectedCode={selectedCode}
              setSelectedCode={setSelectedCode}
              code={signUpDataCode}
              maxLength={phoneMaxLength}
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400).duration(500).springify()}>
            <AnimatedInput
              label="Email"
              name="email"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Optionnel"
            />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(500).springify()}>
            <RoleSelector options={roleOptions} />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(600).duration(500).springify()}
            style={styles.buttonContainer}
          >
            <SubmitGradientButton
              title="ENREGISTRER LES MODIFICATIONS"
              busy={isPending}
            />
          </Animated.View>

          {isLoadingUser && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.primary.main} />
            </View>
          )}
        </View>
      </ScrollView>
    </Form>
  );
};
