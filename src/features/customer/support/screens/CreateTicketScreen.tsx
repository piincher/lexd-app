/**
 * Create Ticket Screen
 * Composition-only screen for creating a new support ticket
 */

import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Screen } from '@src/shared/ui';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useCreateTicketForm } from './hooks/useCreateTicketForm';
import { CreateTicketForm, TicketAttachmentPicker, SubmitButton } from './components';

export const CreateTicketScreen: React.FC<RootStackScreenProps<'CreateTicket'>> = ({ navigation }) => {
  const { form, errors, isSubmitting, onSubmit, pickImage, isUploading } = useCreateTicketForm({
    onSuccess: () => {
      if (navigation.canGoBack()) navigation.goBack();
      else navigation.navigate('TicketList');
    },
  });
  const scrollViewRef = React.useRef<ScrollView>(null);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 250);
  };

  return (
    <Screen
      header={
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Nouvelle demande" />
        </Appbar.Header>
      }
      footer={<SubmitButton loading={isSubmitting} onPress={onSubmit} />}
      contentStyle={{ padding: 16, paddingBottom: 24 }}
      scrollable={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <CreateTicketForm
            form={form}
            errors={errors}
            disabled={isSubmitting}
            onInputFocus={scrollToEnd}
          />
          <TicketAttachmentPicker
            attachments={form.attachments}
            onChange={form.setAttachments}
            onPick={pickImage}
            isUploading={isUploading}
            disabled={isSubmitting}
          />
          <View style={{ height: 280 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default CreateTicketScreen;
