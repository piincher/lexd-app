/**
 * Create Ticket Screen
 * Composition-only screen for creating a new support ticket
 */

import React from 'react';
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

  return (
    <Screen
      header={
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Nouveau Ticket" />
        </Appbar.Header>
      }
      footer={<SubmitButton loading={isSubmitting} onPress={onSubmit} />}
      contentStyle={{ padding: 16, paddingBottom: 24 }}
    >
      <CreateTicketForm form={form} errors={errors} disabled={isSubmitting} />
      <TicketAttachmentPicker
        attachments={form.attachments}
        onChange={form.setAttachments}
        onPick={pickImage}
        isUploading={isUploading}
        disabled={isSubmitting}
      />
    </Screen>
  );
};

export default CreateTicketScreen;
