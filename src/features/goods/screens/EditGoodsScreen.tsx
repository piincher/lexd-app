import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import type { RootStackScreenProps } from '@src/navigations/type';
import { useAppTheme } from '@src/providers/ThemeProvider';
import { useEditGoods } from '../hooks/useEditGoods';
import { GoodsForm, EditGoodsHeader, EditGoodsLoading, EditGoodsError } from '../components';
import { GoodsPhotosUpload } from '@src/shared/ui';

const EditGoodsScreen: React.FC<RootStackScreenProps<'EditGoods'>> = ({
  route,
  navigation,
}) => {
  const { colors } = useAppTheme();
  const { goodsId } = route.params;
  const {
    status,
    isSaving,
    error,
    isAdmin,
    formData,
    calculatedCBM,
    calculatedTotalCost,
    updateField,
    handleSaveWithHaptic,
    photoUris,
    onPhotoSelected,
    onPhotoRemoved,
  } = useEditGoods(goodsId);

  const goBack = () => navigation.goBack();
  const goNotifications = () => navigation.navigate('Notifications' as never);

  if (status === 'loading') {
    return <EditGoodsLoading onBack={goBack} onNotification={goNotifications} />;
  }

  if (status === 'error') {
    return <EditGoodsError isAdmin={isAdmin} error={error} onBack={goBack} onNotification={goNotifications} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.paper }]}>
      <EditGoodsHeader
        title="Modifier la marchandise"
        onBack={goBack}
        onNotification={goNotifications}
        color={colors.text.secondary}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GoodsForm
          data={formData}
          onChange={updateField}
          calculatedCBM={calculatedCBM}
          calculatedTotalCost={calculatedTotalCost}
        />
        <GoodsPhotosUpload
          photoUris={photoUris}
          onPhotoSelected={onPhotoSelected}
          onPhotoRemoved={onPhotoRemoved}
        />
        <Button
          mode="contained"
          onPress={handleSaveWithHaptic}
          loading={isSaving}
          disabled={isSaving}
          style={styles.saveButton}
          icon="content-save"
        >
          {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  saveButton: {
    marginTop: 24,
    borderRadius: 8,
  },
});

export default EditGoodsScreen;
