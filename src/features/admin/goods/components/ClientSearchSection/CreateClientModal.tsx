/**
 * CreateClientModal - Inline client creation from the receive-goods client search.
 *
 * Surfaced when the operator searches for a client that doesn't exist yet. The modal
 * pre-fills its fields from the search query (digits → phoneNumber, words → name split)
 * so the operator usually just confirms instead of re-typing. On success the parent gets
 * the new client object and auto-selects it in the form.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import { useAppTheme } from '@src/providers/ThemeProvider';
import type { userData } from '@src/shared/types/user';
import { useAdminCreateClient } from '@src/features/admin/users/hooks/useAdminCreateClient';

interface CreateClientModalProps {
  visible: boolean;
  initialQuery: string;
  onDismiss: () => void;
  onCreated: (client: userData) => void;
}

type FormState = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const LOOKS_LIKE_PHONE = /^[\d\s+\-()]+$/;

/**
 * Smart pre-fill — if the operator's search query looks like a phone number, drop it in
 * the phone field; otherwise split into first / last names so they don't retype.
 */
const buildInitialState = (query: string): FormState => {
  const trimmed = query.trim();
  if (!trimmed) return { firstName: '', lastName: '', phoneNumber: '' };

  if (LOOKS_LIKE_PHONE.test(trimmed)) {
    return { firstName: '', lastName: '', phoneNumber: trimmed };
  }

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return { firstName: parts[0], lastName: '', phoneNumber: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' '), phoneNumber: '' };
};

const validate = (state: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!state.firstName.trim()) errors.firstName = 'Prénom requis';
  if (!state.lastName.trim()) errors.lastName = 'Nom requis';
  const digits = (state.phoneNumber || '').replace(/\D/g, '');
  if (!state.phoneNumber.trim()) errors.phoneNumber = 'Téléphone requis';
  else if (digits.length < 8) errors.phoneNumber = 'Numéro invalide (minimum 8 chiffres)';
  return errors;
};

export const CreateClientModal: React.FC<CreateClientModalProps> = ({
  visible,
  initialQuery,
  onDismiss,
  onCreated,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { mutate, isPending } = useAdminCreateClient();

  const [state, setState] = useState<FormState>(() => buildInitialState(initialQuery));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Re-seed when the modal re-opens with a different query (operator searched again).
  useEffect(() => {
    if (visible) {
      setState(buildInitialState(initialQuery));
      setErrors({});
      setSubmitted(false);
      setServerError(null);
    }
  }, [visible, initialQuery]);

  const update = (key: keyof FormState) => (value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (submitted) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (serverError) setServerError(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const v = validate(state);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    mutate(
      {
        firstName: state.firstName.trim(),
        lastName: state.lastName.trim(),
        phoneNumber: state.phoneNumber.trim(),
      },
      {
        onSuccess: (res) => {
          if (!res?.user?._id) {
            setServerError('Client créé mais la réponse est incomplète. Recherchez-le manuellement.');
            return;
          }
          onCreated(res.user as userData);
          onDismiss();
        },
        onError: (err) => {
          setServerError(err?.message || 'Création échouée');
        },
      },
    );
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={isPending ? undefined : onDismiss} style={styles.dialog}>
        <Dialog.Title style={styles.title}>Nouveau client</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.subtitle}>
            Ajoutez le client maintenant — il sera sélectionné automatiquement pour cette marchandise.
          </Text>

          <TextInput
            label="Prénom"
            value={state.firstName}
            onChangeText={update('firstName')}
            error={!!errors.firstName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
            disabled={isPending}
          />
          {errors.firstName ? <Text style={styles.error}>{errors.firstName}</Text> : null}

          <TextInput
            label="Nom"
            value={state.lastName}
            onChangeText={update('lastName')}
            error={!!errors.lastName}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
            disabled={isPending}
          />
          {errors.lastName ? <Text style={styles.error}>{errors.lastName}</Text> : null}

          <TextInput
            label="Téléphone"
            value={state.phoneNumber}
            onChangeText={update('phoneNumber')}
            error={!!errors.phoneNumber}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            disabled={isPending}
            placeholder="+223 ..."
          />
          {errors.phoneNumber ? <Text style={styles.error}>{errors.phoneNumber}</Text> : null}

          {serverError ? (
            <View style={styles.serverErrorBox}>
              <Text style={styles.serverErrorText}>{serverError}</Text>
            </View>
          ) : null}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} disabled={isPending}>
            Annuler
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isPending}
            disabled={isPending}
            icon="account-plus"
          >
            Ajouter
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const createStyles = (colors: ReturnType<typeof useAppTheme>['colors']) =>
  StyleSheet.create({
    dialog: {
      backgroundColor: colors.background.card,
      borderRadius: 16,
    },
    title: {
      fontWeight: '700',
    },
    subtitle: {
      fontSize: 13,
      color: colors.text.secondary,
      marginBottom: 16,
      lineHeight: 18,
    },
    input: {
      marginBottom: 4,
      backgroundColor: colors.background.card,
    },
    error: {
      color: colors.status.error,
      fontSize: 12,
      marginBottom: 8,
      marginLeft: 4,
    },
    serverErrorBox: {
      marginTop: 12,
      padding: 10,
      borderRadius: 8,
      backgroundColor: colors.feedback.errorBg,
      borderWidth: 1,
      borderColor: colors.status.error,
    },
    serverErrorText: {
      color: colors.feedback.errorDark,
      fontSize: 13,
      fontWeight: '600',
    },
  });
