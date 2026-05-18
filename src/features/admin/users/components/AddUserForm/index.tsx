import React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import type { AnyObjectSchema } from 'yup';

import Form from '@src/components/Form/Form';
import { AnimatedInput } from '../AnimatedInput';
import { AnimatedPhoneInput } from '../AnimatedPhoneInput';
import { SubmitGradientButton } from '../SubmitGradientButton';
import { createStyles } from './AddUserForm.styles';
import { useAppTheme } from '@src/providers/ThemeProvider';

interface AddUserFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  referralCode: string;
}

interface AddUserFormProps {
  initialValues: AddUserFormValues;
  onSubmit: (values: AddUserFormValues) => void;
  validationSchema: AnyObjectSchema;
  selectedCode: string;
  setSelectedCode: (code: string) => void;
  isPending: boolean;
  signUpDataCode: { label: string; value: string }[];
  phoneMaxLength: number;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({
  initialValues,
  onSubmit,
  validationSchema,
  selectedCode,
  setSelectedCode,
  isPending,
  signUpDataCode,
  phoneMaxLength,
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

          <Animated.View
            entering={FadeInUp.delay(400).duration(500).springify()}
          >
            <AnimatedInput
              label="Code de parrainage"
              name="referralCode"
              icon="gift-outline"
              autoCapitalize="characters"
              placeholder="Optionnel"
            />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(500).duration(500).springify()}
            style={styles.buttonContainer}
          >
            <SubmitGradientButton
              title="AJOUTER UN UTILISATEUR"
              busy={isPending}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </Form>
  );
};
