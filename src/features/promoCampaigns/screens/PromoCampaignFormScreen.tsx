import React from 'react';
import { View } from 'react-native';
import type { RootStackScreenProps } from '@src/navigations/type';
import { Screen , Loading } from '@src/shared/ui';
import { usePromoCampaignAdmin } from '../hooks/usePromoCampaignAdminQueries';
import { PromoCampaignForm } from '../components/PromoCampaignForm';


const PromoCampaignFormScreen = ({ route }: RootStackScreenProps<'PromoCampaignForm'>) => {
  const { id } = route.params || {};
  const { data: campaign, isLoading } = usePromoCampaignAdmin(id);

  return (
    <Screen
      header={{ title: id ? 'Modifier la campagne' : 'Nouvelle campagne', showBack: true }}
      variant="card"
      scrollable={false}
    >
      {isLoading && id ? (
        <Loading />
      ) : (
        <PromoCampaignForm campaign={campaign} campaignId={id} />
      )}
    </Screen>
  );
};

export default PromoCampaignFormScreen;
