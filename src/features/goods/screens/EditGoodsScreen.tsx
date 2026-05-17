import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { useEditGoodsScreen } from './hooks/useEditGoodsScreen';
import { useEditGoodsScreenStyles } from './EditGoodsScreen.styles';
import { GoodsForm, EditGoodsHeader, EditGoodsLoading, EditGoodsError } from '../components';
import { GoodsPhotosUpload } from '@src/shared/ui';

const EditGoodsScreen: React.FC = () => {
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
    handlers,
  } = useEditGoodsScreen();

  const styles = useEditGoodsScreenStyles();

  if (status === 'loading') {
    return <EditGoodsLoading onBack={handlers.handleBack} onNotification={handlers.handleNotifications} />;
  }

  if (status === 'error') {
    return <EditGoodsError isAdmin={isAdmin} error={error} onBack={handlers.handleBack} onNotification={handlers.handleNotifications} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <EditGoodsHeader
        title="Modifier la marchandise"
        onBack={handlers.handleBack}
        onNotification={handlers.handleNotifications}
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

export default EditGoodsScreen;
