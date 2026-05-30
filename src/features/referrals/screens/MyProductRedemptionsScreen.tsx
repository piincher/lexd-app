import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Screen } from '@src/shared/ui/Screen';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { ProductRedemptionCard } from '../components/ProductRedemptionCard';
import { RedemptionEmptyState } from '../components/RedemptionEmptyState';
import { useMyProductRedemptions } from '../hooks/useProductRedemptions';
import { createStyles } from './MyProductRedemptionsScreen.styles';

export const MyProductRedemptionsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = createStyles(colors);
  const { redemptions, cancelRedemption, isCancellingRedemption } = useMyProductRedemptions(20);
  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const items = useMemo(() => {
    if (!redemptions.data) return [];
    return redemptions.data.pages.flatMap((page) => page.items);
  }, [redemptions.data]);

  const handleCancel = useCallback((id: string) => { cancelRedemption(id); }, [cancelRedemption]);

  return (
    <Screen header={{ title: 'Mes échanges', showBack: true, onBackPress: handleBack }} contentStyle={styles.content}>
      {redemptions.isLoading && (
        <View style={styles.state}><ActivityIndicator color={colors.primary.main} /></View>
      )}

      {redemptions.isError && (
        <View style={styles.state}>
          <MaterialCommunityIcons name="alert-circle-outline" size={40} color={colors.status.error} />
          <Text style={styles.stateText}>Impossible de charger vos échanges.</Text>
          <TouchableOpacity onPress={() => redemptions.refetch()}>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        </View>
      )}

      {!redemptions.isLoading && !redemptions.isError && items.length === 0 && (
        <View style={styles.state}>
          <RedemptionEmptyState title="Aucun échange" subtitle="Vos échanges de produits apparaîtront ici." icon="gift-off-outline" />
        </View>
      )}

      {!redemptions.isLoading && !redemptions.isError && items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductRedemptionCard redemption={item} onCancel={handleCancel} isCancelling={isCancellingRedemption} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onEndReached={() => { if (redemptions.hasNextPage && !redemptions.isFetchingNextPage) redemptions.fetchNextPage(); }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={redemptions.isFetchingNextPage ? <ActivityIndicator color={colors.primary.main} style={{ marginVertical: 16 }} /> : null}
        />
      )}
    </Screen>
  );
};

export default MyProductRedemptionsScreen;
