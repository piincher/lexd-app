import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useQuery } from '@tanstack/react-query';
import { getMyRewards } from '../api/rewardApi';
import { createStyles } from './RedemptionRequestModal.styles';

interface RedemptionRequestModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (points: number, note?: string) => void;
  isSubmitting: boolean;
}

const formatFCFA = (value: number) => `${Math.round(value).toLocaleString('fr-FR')} FCFA`;

export const RedemptionRequestModal: React.FC<RedemptionRequestModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isSubmitting,
}) => {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [points, setPoints] = useState('');
  const [note, setNote] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  const rewardsQuery = useQuery({
    queryKey: ['rewards', 'me'],
    queryFn: getMyRewards,
    enabled: visible,
  });

  const settings = rewardsQuery.data?.settings;
  const maxPoints = rewardsQuery.data?.rewardPoints || 0;
  const pointValueFCFA = settings?.pointValueFCFA || 50;
  const minPoints = settings?.minRedemptionPoints || 100;
  const isEnabled = settings?.enabled !== false;

  const parsedPoints = Number.parseInt(points, 10) || 0;

  const validationError = useMemo(() => {
    if (!isEnabled) return 'Le système de récompense est temporairement désactivé.';
    if (parsedPoints <= 0) return null;
    if (parsedPoints < minPoints) return `Minimum ${minPoints} points requis`;
    if (parsedPoints > maxPoints) return `Maximum ${maxPoints} points disponibles`;
    return null;
  }, [parsedPoints, maxPoints, minPoints, isEnabled]);

  const isValid = parsedPoints > 0 && parsedPoints >= minPoints && parsedPoints <= maxPoints && isEnabled;

  useEffect(() => {
    if (!visible) {
      setPoints('');
      setNote('');
    }
  }, [visible]);

  const handleQuickSelect = useCallback(
    (value: number) => {
      setPoints(String(Math.min(value, maxPoints)));
    },
    [maxPoints]
  );

  const quickValues = useMemo(() => {
    if (!maxPoints || !minPoints) return [];
    const values = [];
    if (minPoints <= maxPoints) values.push(minPoints);
    const half = Math.floor(maxPoints / 2);
    if (half >= minPoints && !values.includes(half)) values.push(half);
    if (maxPoints >= minPoints && !values.includes(maxPoints)) values.push(maxPoints);
    return values.sort((a, b) => a - b).slice(0, 3);
  }, [maxPoints, minPoints]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.sheet}>
              <View style={styles.header}>
                <Text style={styles.title}>Utiliser des points</Text>
                <TouchableOpacity style={styles.iconButton} onPress={onClose} disabled={isSubmitting}>
                  <MaterialCommunityIcons name="close" size={20} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              {!isEnabled ? (
                <View style={[styles.disabledBox, { backgroundColor: colors.status.error + '10' }]}>
                  <MaterialCommunityIcons name="alert-circle-outline" size={24} color={colors.status.error} />
                  <Text style={[styles.disabledText, { color: colors.status.error }]}>
                    Le système de récompense est temporairement désactivé.
                  </Text>
                </View>
              ) : (
                <>
                  <Text style={styles.copy}>
                    {`Votre demande sera envoyée à l'administration. Les points demandés seront réservés
                    pendant la validation, puis utilisés pour réduire vos frais d'expédition.`}
                  </Text>

                  <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                      <MaterialCommunityIcons name="wallet-outline" size={16} color={colors.primary.main} />
                      <Text style={styles.infoText}>{maxPoints} points disponibles</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <MaterialCommunityIcons name="cash" size={16} color={colors.status.success} />
                      <Text style={styles.infoText}>
                        Valeur max: {formatFCFA(maxPoints * pointValueFCFA)}
                      </Text>
                    </View>
                    <View style={styles.infoRow}>
                      <MaterialCommunityIcons name="arrow-down-bold-circle-outline" size={16} color={colors.status.warning} />
                      <Text style={styles.infoText}>Minimum: {minPoints} points</Text>
                    </View>
                  </View>

                  {quickValues.length > 0 && (
                    <View style={styles.quickSelectRow}>
                      {quickValues.map((value) => (
                        <TouchableOpacity
                          key={value}
                          style={[
                            styles.quickButton,
                            parsedPoints === value && styles.quickButtonActive,
                          ]}
                          onPress={() => handleQuickSelect(value)}
                        >
                          <Text
                            style={[
                              styles.quickButtonText,
                              parsedPoints === value && styles.quickButtonTextActive,
                            ]}
                          >
                            {value}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  <TextInput
                    style={[styles.input, validationError && parsedPoints > 0 && styles.inputError]}
                    value={points}
                    onChangeText={setPoints}
                    keyboardType="number-pad"
                    placeholder="Nombre de points"
                    placeholderTextColor={colors.text.disabled}
                    editable={!isSubmitting}
                    onFocus={scrollToEnd}
                  />
                  {validationError && parsedPoints > 0 && (
                    <Text style={[styles.errorText, { color: colors.status.error }]}>
                      {validationError}
                    </Text>
                  )}

                  <TextInput
                    style={[styles.input, styles.noteInput]}
                    value={note}
                    onChangeText={setNote}
                    placeholder="Note optionnelle"
                    placeholderTextColor={colors.text.disabled}
                    multiline
                    editable={!isSubmitting}
                    onFocus={scrollToEnd}
                  />

                  <Text style={[styles.preview, !isValid && styles.previewMuted]}>
                    Valeur demandée: {formatFCFA(parsedPoints * pointValueFCFA)}
                  </Text>

                  <TouchableOpacity
                    style={[styles.submitButton, (!isValid || isSubmitting) && styles.submitDisabled]}
                    disabled={!isValid || isSubmitting}
                    onPress={() => onSubmit(parsedPoints, note.trim() || undefined)}
                  >
                    <Text style={styles.submitText}>
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={{ height: 280 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
