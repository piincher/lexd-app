import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Button, Loading } from '@src/shared/ui';
import { useEventForm } from '../hooks/useEventForm';
import { EventFormBody } from '../components/EventFormBody';
import { createStyles } from './EventFormScreen.styles';

const EventFormScreen = ({ navigation, route }: RootStackScreenProps<'EventForm'>) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const ctrl = useEventForm(route.params?.id);

  const handleSave = async () => {
    try {
      await ctrl.submit();
      navigation.goBack();
    } catch (err) {
      Alert.alert('Impossible d\'enregistrer', (err as Error).message);
    }
  };

  if (ctrl.isLoading) return <Loading />;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{ctrl.isEdit ? 'Modifier l\'événement' : 'Nouvel événement'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <EventFormBody ctrl={ctrl} />
        </ScrollView>
        <View style={styles.footer}>
          <Button
            title={ctrl.isEdit ? 'Enregistrer' : 'Créer l\'événement'}
            onPress={handleSave}
            loading={ctrl.isSaving}
            disabled={!!ctrl.validationError}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EventFormScreen;
