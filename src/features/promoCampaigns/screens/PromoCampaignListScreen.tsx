import React from 'react';
import { View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { Loading, EmptyState } from '@src/shared/ui';
import { usePromoCampaignsAdmin } from '../hooks/usePromoCampaignAdminQueries';
import { PromoCampaignListItem } from '../components/PromoCampaignListItem';
import type { PromoCampaignAdmin } from '../api/promoCampaignAdminApi';
import { createStyles } from './PromoCampaignListScreen.styles';

const PromoCampaignListScreen = ({ navigation }: RootStackScreenProps<'PromoCampaignList'>) => {
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { data, isLoading, isRefetching, refetch } = usePromoCampaignsAdmin();

  const campaigns = data?.campaigns ?? [];
  const openForm = (id?: string) => navigation.navigate('PromoCampaignForm', id ? { id } : undefined);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Campagnes promo</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <FlashList
          data={campaigns}
          keyExtractor={(item: PromoCampaignAdmin) => item._id}
          renderItem={({ item }) => <PromoCampaignListItem campaign={item} onPress={openForm} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          ListEmptyComponent={
            <EmptyState
              title="Aucune campagne"
              message="Créez votre première campagne promotionnelle."
            />
          }
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => openForm()} accessibilityLabel="Créer une campagne">
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PromoCampaignListScreen;
