/**
 * Create Ticket Screen
 * Form for creating a new support ticket
 */

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Appbar,
  Text,
  TextInput,
  Button,
  HelperText,
  ActivityIndicator,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { RootStackScreenProps } from '@src/navigations/type';
import { Fonts } from '@src/constants/Fonts';
import { COLORS } from '@src/constants/Colors';
import { useCreateTicket, useUploadAttachment } from '../hooks/useTickets';
import { TicketTypeSelector } from '../components';
import { TicketType } from '../types';
import { showMessage } from 'react-native-flash-message';

const MAX_ATTACHMENTS = 3;

const CreateTicketScreen: React.FC<RootStackScreenProps<'CreateTicket'>> = ({
  navigation,
}) => {
  const theme = useTheme();

  // Form state
  const [type, setType] = useState<TicketType | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createTicketMutation = useCreateTicket();
  const uploadMutation = useUploadAttachment();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!type) {
      newErrors.type = 'Veuillez sélectionner un type de demande';
    }
    if (!subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    } else if (subject.length < 5) {
      newErrors.subject = 'Le sujet doit contenir au moins 5 caractères';
    }
    if (!description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (description.length < 20) {
      newErrors.description = 'Veuillez décrire votre problème en au moins 20 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !type) return;

    try {
      await createTicketMutation.mutateAsync({
        type,
        subject: subject.trim(),
        description: description.trim(),
        attachments: attachments.length > 0 ? attachments : undefined,
      });

      showMessage({
        message: 'Ticket créé avec succès',
        description: 'Nous vous répondrons dans les plus brefs délais.',
        type: 'success',
        duration: 3000,
      });

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: 'Erreur',
        description: 'Une erreur est survenue lors de la création du ticket.',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const handlePickImage = async () => {
    if (attachments.length >= MAX_ATTACHMENTS) {
      Alert.alert(
        'Limite atteinte',
        `Vous ne pouvez pas joindre plus de ${MAX_ATTACHMENTS} photos.`
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        
        // Upload the image
        const url = await uploadMutation.mutateAsync({
          file: {
            uri: asset.uri,
            name: asset.fileName || 'image.jpg',
            type: asset.mimeType || 'image/jpeg',
          },
        });

        setAttachments((prev) => [...prev, url]);
      }
    } catch (error) {
      showMessage({
        message: 'Erreur',
        description: 'Impossible de télécharger l\'image. Veuillez réessayer.',
        type: 'danger',
      });
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const isSubmitting = createTicketMutation.isPending || uploadMutation.isPending;

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Nouveau ticket" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Type Selector */}
          <TicketTypeSelector
            value={type}
            onSelect={(selectedType) => {
              setType(selectedType);
              setErrors((prev) => ({ ...prev, type: '' }));
            }}
            disabled={isSubmitting}
          />
          {errors.type && <HelperText type="error">{errors.type}</HelperText>}

          {/* Subject Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Sujet</Text>
            <TextInput
              mode="outlined"
              placeholder="Décrivez brièvement votre problème"
              value={subject}
              onChangeText={(text) => {
                setSubject(text);
                setErrors((prev) => ({ ...prev, subject: '' }));
              }}
              error={!!errors.subject}
              disabled={isSubmitting}
              style={styles.input}
              maxLength={100}
            />
            {errors.subject && <HelperText type="error">{errors.subject}</HelperText>}
          </View>

          {/* Description Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              mode="outlined"
              placeholder="Décrivez votre problème en détail..."
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                setErrors((prev) => ({ ...prev, description: '' }));
              }}
              error={!!errors.description}
              disabled={isSubmitting}
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              maxLength={2000}
            />
            {errors.description && <HelperText type="error">{errors.description}</HelperText>}
            <Text style={styles.charCount}>{description.length}/2000</Text>
          </View>

          {/* Attachments Section */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pièces jointes (optionnel)</Text>
            <Text style={styles.hint}>Vous pouvez joindre jusqu'à {MAX_ATTACHMENTS} photos</Text>

            <View style={styles.attachmentsContainer}>
              {attachments.map((uri, index) => (
                <View key={index} style={styles.attachmentPreview}>
                  <MaterialCommunityIcons name="image" size={40} color={COLORS.DimGray} />
                  <IconButton
                    icon="close-circle"
                    size={20}
                    iconColor={COLORS.danger}
                    style={styles.removeButton}
                    onPress={() => handleRemoveAttachment(index)}
                    disabled={isSubmitting}
                  />
                </View>
              ))}

              {attachments.length < MAX_ATTACHMENTS && (
                <IconButton
                  icon="camera-plus"
                  size={32}
                  iconColor={theme.colors.primary}
                  style={styles.addButton}
                  onPress={handlePickImage}
                  disabled={isSubmitting || uploadMutation.isPending}
                />
              )}
            </View>

            {uploadMutation.isPending && (
              <View style={styles.uploadingIndicator}>
                <ActivityIndicator size="small" color={theme.colors.primary} />
                <Text style={styles.uploadingText}>Téléchargement...</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
          >
            {isSubmitting ? 'Création...' : 'Créer le ticket'}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  headerTitle: {
    fontFamily: Fonts.bold,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: Fonts.meduim,
    fontSize: 14,
    color: COLORS.DimGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 12,
  },
  charCount: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.SlateGray,
    textAlign: 'right',
    marginTop: 4,
  },
  hint: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.SlateGray,
    marginBottom: 8,
  },
  attachmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  attachmentPreview: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.Silver,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    margin: 0,
  },
  addButton: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.FeatherWhite,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.Silver,
    borderStyle: 'dashed',
  },
  uploadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  uploadingText: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: COLORS.DimGray,
    marginLeft: 8,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.Silver,
  },
  submitButton: {
    borderRadius: 8,
  },
  submitButtonContent: {
    height: 48,
  },
});

export default CreateTicketScreen;
